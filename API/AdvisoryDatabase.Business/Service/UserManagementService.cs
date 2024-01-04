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

    public class GetserInfoDetail : Repository<GetUserDetail, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetUserDetail, int> CreateDalManager()
        {
            return new DataAccessGetUserDetail();
        }
    }

    public class GetserInfoDetailById : Repository<GetUserDetail, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetUserDetail, int> CreateDalManager()
        {
            return new DataAccessGetUserDetailById();
        }
    }

    public class UpdateUser : Repository<AddUserInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddUserInfo, int> CreateDalManager()
        {
            return new DataAccessUpdateUser();
        }

        public int GetUpdatedUserMasterID(AddUserInfo obj)
        {

            int updatedUserMasterID = obj.UserMasterID;
            return updatedUserMasterID;
        }
    }

    public class DeleteUser : Repository<GetUserDetail, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetUserDetail, int> CreateDalManager()
        {
            return new DataAccessDeleteUser();
        }

    }

    public class EnableUser : Repository<AddUserInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddUserInfo, int> CreateDalManager()
        {
            return new DataAccessEnableUser();
        }

    }

    public class ForgetPasswardService : Repository<ForgetPassward, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<ForgetPassward, int> CreateDalManager()
        {
            return new DataAccessForgetPassward();
        }

    }
}
