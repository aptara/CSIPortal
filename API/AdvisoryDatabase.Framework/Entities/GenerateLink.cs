using AdvisoryDatabase.Framework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Framework.Entities
{
    public class GenerateLink : BaseEntity<Int32>
    {
        public int ClientId { get; set; }
        public long ProjectId { get; set; }
        public string Clientemail { get; set; }
        public string ProjectName { get; set; }
        public string Remark { get; set; }


    }
}
