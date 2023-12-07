using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using CSINotification.Core;

namespace CSINotification.Service
{
    public partial class CSINotificationService : ServiceBase
    {
        public CSINotificationService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            eMailNotificationManager.Start();
        }

        protected override void OnStop()
        {
            eMailNotificationManager.Stop();
        }
    }
}
