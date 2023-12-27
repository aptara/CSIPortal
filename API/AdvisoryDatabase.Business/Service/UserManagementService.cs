using AdvisoryDatabase.Business.Repository;
using AdvisoryDatabase.DataAccess.DataAccessService;
using AdvisoryDatabase.Framework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Business.Service
{
    public class UserManagement : Repository<RoleMangement, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<RoleMangement, int> CreateDalManager()
        {
           return new DataAccessGeRole();
        }
    }

    public class AddUserInfoDetail : Repository<AddUserInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddUserInfo, int> CreateDalManager()
        {
            return new DataAccessAddUserInfo();
        }
    }
}
