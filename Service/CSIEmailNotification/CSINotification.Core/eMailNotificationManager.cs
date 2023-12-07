using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using LogHelper;
using System.IO;
using System.Diagnostics;
using System.Timers;

namespace CSINotification.Core
{
    public enum EmaiNotificationStatus
    {
        ReadyToSend = 1,
        PickedupForSending,
        SentSuccessfully,
        SendingError
    }

    public class eMailNotificationManager
    {
        private static Timer NotificationTimer { get; set; }

        private static eMailNotificationManager instance = null;
        public static eMailNotificationManager Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new eMailNotificationManager();
                }
                return instance;
            }
        }

        public static string GetAssemblyVersion()
        {
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            FileVersionInfo fileVersionInfo = FileVersionInfo.GetVersionInfo(assembly.Location);
            return fileVersionInfo.FileVersion;
        }


        public static void SendMail(List<string> to, List<string> cc, List<string> bcc, string subject, string message, string attachmentFileName)
        {
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                using (SmtpClient email = new SmtpClient())
                {
                    using (MailMessage mailMessage = new MailMessage())
                    {
                        email.DeliveryMethod = SmtpDeliveryMethod.Network;
                        email.UseDefaultCredentials = false;
                        NetworkCredential credential = new NetworkCredential(Parameters.Instance.SMTPUserName, Parameters.Instance.SMTPPassword);
                        email.Credentials = credential;
                        email.Port = Parameters.Instance.SMTPPort;
                        email.Host = Parameters.Instance.SMTPServer;
                        email.EnableSsl = Parameters.Instance.EnableSsl;
                        string FromEmailId = Parameters.Instance.FromeMailId;

                        mailMessage.From = new MailAddress(FromEmailId, Parameters.Instance.DisplayName);
                        mailMessage.Subject = subject;
                        mailMessage.Body = message;
                        mailMessage.IsBodyHtml = true;
                        mailMessage.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                        mailMessage.ReplyToList.Add(new MailAddress(Parameters.Instance.FromeMailId, Parameters.Instance.DisplayName));

                        if (!string.IsNullOrEmpty(attachmentFileName))
                        {
                            Attachment attachment = new System.Net.Mail.Attachment(attachmentFileName);
                            mailMessage.Attachments.Add(attachment);
                        }

                        if (to != null) to.ForEach(entry => mailMessage.To.Add(entry));

                        if (cc != null) cc.ForEach(entry => mailMessage.CC.Add(entry));

                        if (bcc != null) bcc.ForEach(entry => mailMessage.Bcc.Add(entry));

                        email.Send(mailMessage);

                        Logger.Instance().Write(LogLevel.Verbose, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name,
                            string.Format("Done sending notification to = {0}", string.Join(";", to.ToList())));
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Instance().Write(LogLevel.Info, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, ex.Message + " :: " + ex.InnerException, ex.StackTrace);
                throw;
            }

        }

        public static void Start()
        {
            string logFilePath = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            
            Logger.Instance().Start(Path.Combine(logFilePath, Properties.Settings.Default.LogLocation), Properties.Settings.Default.LogFileName,
                Properties.Settings.Default.LogFileName + ".bkup", (LogLevel)Properties.Settings.Default.LogLevel,
                Properties.Settings.Default.LogFileSize * 1024 * 1024, Properties.Settings.Default.LogFlushIntervalInSeconds * 1000);

            Logger.Instance().Write(LogLevel.Info, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name,
                string.Format("Starting Reglake Notification Processing Engine {0}", GetAssemblyVersion()));

            Logger.Instance().Flush();

            NotificationTimer = new Timer();
            NotificationTimer_Elapsed(null, null);
            NotificationTimer.Interval = Properties.Settings.Default.NotificationSendingTimerInMin * 1000 * 60;
            NotificationTimer.Elapsed += NotificationTimer_Elapsed;
            NotificationTimer.Enabled = true;
        }

        private static void NotificationTimer_Elapsed(object sender, ElapsedEventArgs e)
        {
            try
            {
                NotificationTimer.Enabled = false;

                Logger.Instance().Write(LogLevel.Info, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, "Started sending snotifications");
                SendNotification();
                Logger.Instance().Flush();
                Logger.Instance().Write(LogLevel.Info, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, "Done sending snotifications");
            }
            catch (Exception ex)
            {
                Logger.Instance().Write(LogLevel.Error, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, string.Format("Exception - " + ex.Message), ex.StackTrace);
            }
            finally
            {
                NotificationTimer.Enabled = true;
            }
        }

        private static void SendNotification()
        {

            List<EmailNotification> eMailList = null;
            using (Aptara_ClientPowerTrackEntities entities = new Aptara_ClientPowerTrackEntities())
            {
                eMailList = entities.EmailNotifications.Where(entry => entry.EmailSendStatus == (int)EmaiNotificationStatus.ReadyToSend).ToList();
                Logger.Instance().Write(LogLevel.Info, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name,
                                string.Format("Number of email notifications to be sent - {0}", eMailList.Count));
                foreach (EmailNotification email in eMailList)
                {
                    //email.Receipent = "yogesh.satpute@a.com,b@c.com;c@c.com";
                    if (string.IsNullOrEmpty(email.Receipent))
                        continue;


                    if (entities.EmailNotifications.Where(entry => entry.EmailSendStatus == (int)EmaiNotificationStatus.ReadyToSend && entry.EmailNotificationID == email.EmailNotificationID).Count() > 0)
                    {
                        try
                        {
                            Logger.Instance().Write(LogLevel.Info, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, string.Format("Sending notification with EmailNotificationID={0}", email.EmailNotificationID));
                            entities.USP_UpdateMailNotificationsByID(email.EmailNotificationID, (int)EmaiNotificationStatus.PickedupForSending, null);

                            SendMail(email.Receipent.Split(new char[] { ';', ',' }, StringSplitOptions.RemoveEmptyEntries).ToList(), null, null, email.Subject, email.MailContent, email.AttachedFileName);

                            entities.USP_UpdateMailNotificationsByID(email.EmailNotificationID, (int)EmaiNotificationStatus.SentSuccessfully, null);
                            Logger.Instance().Write(LogLevel.Info, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, string.Format("Done sending notification with EmailNotificationID={0}", email.EmailNotificationID));
                        }
                        catch (Exception ex)
                        {
                            Logger.Instance().Write(LogLevel.Error, MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, string.Format("Exception while sending email", ex.Message), ex.StackTrace);
                            entities.USP_UpdateMailNotificationsByID(email.EmailNotificationID, (int)EmaiNotificationStatus.SendingError, ex.Message);
                        }
                    }

                }
            }
        }


        public static void Stop()
        {
            Logger.Instance().Stop();
        }
    }
}
