using AdvisoryDatabase.Framework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Framework.Entities
{
    public class GetProject : BaseEntity<Int32>
    {
        public int ClientId { get; set; }
        public string ProjectName { get; set; }
        public int ProjectId { get; set; }
    }
}
