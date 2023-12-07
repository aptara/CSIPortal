using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSINotification.Core
{
    internal class Parameters
    {
        private Parameters()
        {
        }
        public string SMTPServer { get; set; }
        public string SMTPUserName { get; set; }
        public string SMTPPassword { get; set; }
        public string FromeMailId { get; set; }
        public string DisplayName { get; set; }
        public int SMTPPort { get; set; }
        public bool EnableSsl { get; set; }

        private static Parameters instance = null;
        public static Parameters Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Parameters();
                    instance.ReadConfiguration();
                }
                return instance;
            }
        }

        private void ReadConfiguration()
        {
            SMTPPort = Convert.ToInt32(GetConfigValue("SMTPPort").Value);
#if DEBUG
            SMTPPort = 587;
#endif


            SMTPServer = GetConfigValue("MailServerDomain").Value;

            FromeMailId = GetConfigValue("SenderEmailAddress").Value;

            SMTPUserName = GetConfigValue("UserName").Value;

            SMTPPassword = GetConfigValue("Password").Value;

            DisplayName = GetConfigValue("eMailDisplayName").Value;

            EnableSsl = Convert.ToBoolean(GetConfigValue("EnableSslFlag").Value);
        }

        public static AppConfiguration GetConfigValue(string key)
        {
            using (Aptara_ClientPowerTrackEntities entities = new Aptara_ClientPowerTrackEntities())
            {
                return entities.AppConfigurations.Where(entry => entry.KeyName.Equals(key)).FirstOrDefault();
            }
        }
    }
}
