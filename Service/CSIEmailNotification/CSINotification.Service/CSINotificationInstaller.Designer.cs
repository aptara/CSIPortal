
namespace CSINotification.Service
{
    partial class CSINotificationInstaller
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.CSINotificationServiceProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
            this.CSINotificationServiceInstaller1 = new System.ServiceProcess.ServiceInstaller();
            // 
            // CSINotificationServiceProcessInstaller
            // 
            this.CSINotificationServiceProcessInstaller.Account = System.ServiceProcess.ServiceAccount.LocalSystem;
            this.CSINotificationServiceProcessInstaller.Password = null;
            this.CSINotificationServiceProcessInstaller.Username = null;
            // 
            // CSINotificationServiceInstaller1
            // 
            this.CSINotificationServiceInstaller1.DisplayName = "CSI Notification";
            this.CSINotificationServiceInstaller1.ServiceName = "CSINotificationService";
            this.CSINotificationServiceInstaller1.StartType = System.ServiceProcess.ServiceStartMode.Automatic;
            // 
            // CSINotificationInstaller
            // 
            this.Installers.AddRange(new System.Configuration.Install.Installer[] {
            this.CSINotificationServiceProcessInstaller,
            this.CSINotificationServiceInstaller1});

        }

        #endregion

        private System.ServiceProcess.ServiceProcessInstaller CSINotificationServiceProcessInstaller;
        private System.ServiceProcess.ServiceInstaller CSINotificationServiceInstaller1;
    }
}