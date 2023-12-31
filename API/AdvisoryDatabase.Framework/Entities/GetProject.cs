﻿using AdvisoryDatabase.Framework.Common;
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
        public int RoleId { get; set; }
        public int UserMasterID { get; set; }
    }
    public class GetProjectDeatils : BaseEntity<Int32>
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ClientName { get; set; }
        
        public int ClientId { get; set; }
        public int IsIncludeDeleted { get; set; }
    }
}
