using AdvisoryDatabase.Framework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Framework.Entities
{
    public class changePassword : BaseEntity<Int32>
    {
        public int UserMasterID { get; set; }
        public string NewPassword { get; set; }
    }
}
