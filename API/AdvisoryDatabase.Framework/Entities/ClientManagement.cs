using AdvisoryDatabase.Framework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Framework.Entities
{
    //class ClientManagement
    //{
    //}
    public class AddClientInfo : BaseEntity<Int32>
    {
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public string ProjectId { get; set; }
        public string AptaraContact { get; set; }
        public string AptaraContactEmail { get; set; }
    }
}
