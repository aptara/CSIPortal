using AdvisoryDatabase.Framework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Framework.Entities
{
    public class RoleMangement : BaseEntity<Int32>
    {
        public int RoleId { get; set; }
        public string Role { get; set; }
    }

    public class AddUserInfo : BaseEntity<Int32>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public string ProjectId { get; set; }
        public int UserMasterID { get; set; }

    }


    public class GetUserDetail : BaseEntity<Int32>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public string ProjectId { get; set; }
        public int UserMasterID { get; set; }
        public string ProjectIds { get; set; }
        public string StatusID { get; set; }
        public int IsIncludeDeleted { get; set; }

    }
    public class ForgetPassward : BaseEntity<Int32>
    {
        public string EmailId { get; set; }
        public int ToCheckId { get; set; }
    }
}
