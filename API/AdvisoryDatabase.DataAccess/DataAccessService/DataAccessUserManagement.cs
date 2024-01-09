using AdvisoryDatabase.DataAccess.Common;
using AdvisoryDatabase.DataAccess.Repository;
using AdvisoryDatabase.Framework.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.DataAccess.DataAccessService
{
    public class DataAccessGeRole : DataAccessRepository<RoleMangement, Int32>
    {
      

        protected override void FillParameters(OperationType operation, RoleMangement instance, List<DbParameter> parameters)
        {
            throw new NotImplementedException();
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.GetAll:
                    spName = "USP_GetRole";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override RoleMangement Parse(System.Data.DataRow data)
        {
            return new RoleMangement
            {
                RoleId = data.Read<Int32>("RoleId"),
                Role = data.ReadString("Role")

            };
        }
    }

    public class DataAccessAddUserInfo : DataAccessRepository<AddUserInfo, Int32>
    {



        protected override void FillParameters(OperationType operation, AddUserInfo instance, List<DbParameter> parameters)
        {
                    parameters.Add(DbHelper.CreateParameter("FirstName", instance.FirstName));
                    parameters.Add(DbHelper.CreateParameter("LastName", instance.LastName));
                    parameters.Add(DbHelper.CreateParameter("EmailId", instance.Email.ToLower()));
                    parameters.Add(DbHelper.CreateParameter("RoleId", instance.Role));
                    parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
     
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Add:
                    spName = "USP_UpdateUser";
                    break;
                
            }
            return spName;
        }

        protected override AddUserInfo Parse(System.Data.DataRow data)
        {
            return new AddUserInfo
            {
             

            };
        }
    }


    public class DataAccessGetUserDetail : DataAccessRepository<GetUserDetail, Int32>
    {
        protected override void FillParameters(OperationType operation, GetUserDetail instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("IsIncludeDeleted", instance.IsIncludeDeleted));
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.GetAll:
                    spName = "USP_GetUserDetail";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetUserDetail Parse(System.Data.DataRow data)
        {
            return new GetUserDetail
            {
                FirstName = data.ReadString("FirstName"),
                LastName = data.ReadString("LastName"),
                Email = data.ReadString("EmailId"),
                RoleId = data.Read<Int32>("RoleId"),
                UserMasterID = data.Read<Int32>("UserMasterID"),
                StatusID = data.ReadString("StatusID"),
                Role = data.ReadString("Role")
            };
        }
    }

    public class DataAccessGetUserDetailById : DataAccessRepository<GetUserDetail, Int32>
    {
        protected override void FillParameters(OperationType operation, GetUserDetail instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("UserMasterID", instance.UserMasterID));
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.GetAll:
                    spName = "USP_UpdateUser";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetUserDetail Parse(System.Data.DataRow data)
        {
            return new GetUserDetail
            {
                FirstName = data.ReadString("FirstName"),
                LastName = data.ReadString("LastName"),
                Email = data.ReadString("EmailId"),
                RoleId = data.Read<Int32>("RoleId"),
                UserMasterID = data.Read<Int32>("UserMasterID"),
                ProjectId = data.ReadString("ProjectIds")
            };
        }


      
    }
    public class DataAccessUpdateUser : DataAccessRepository<AddUserInfo, Int32>
    {
        protected override void FillParameters(OperationType operation, AddUserInfo instance, List<DbParameter> parameters)
        {
            switch (operation)
            {
    
 
  
                case OperationType.Update:
                    parameters.Add(DbHelper.CreateParameter("UserMasterID", instance.UserMasterID));
                    parameters.Add(DbHelper.CreateParameter("FirstName", instance.FirstName));
                    parameters.Add(DbHelper.CreateParameter("LastName", instance.LastName));
                    parameters.Add(DbHelper.CreateParameter("EmailId", instance.Email.ToLower()));
                    parameters.Add(DbHelper.CreateParameter("RoleId", instance.Role));
                    parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));

                    break;
                    default:
                    break;
            }
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Update:
                    spName = "USP_UpdateUser";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override AddUserInfo Parse(System.Data.DataRow data)
        {
            return new AddUserInfo
            {


            };
        }
    }

    public class DataAccessDeleteUser : DataAccessRepository<GetUserDetail, Int32>
    {
        protected override void FillParameters(OperationType operation, GetUserDetail instance, List<DbParameter> parameters)
        {
            switch (operation)
            {



                case OperationType.Delete:
                    parameters.Add(DbHelper.CreateParameter("UserMasterID", instance.UserMasterID));
               
                    break;
                default:
                    break;
            }
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Delete:
                    spName = "USP_UpdateUser";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetUserDetail Parse(System.Data.DataRow data)
        {
            return new GetUserDetail
            {


            };
        }
    }


    public class DataAccessEnableUser : DataAccessRepository<AddUserInfo, Int32>
    {
        protected override void FillParameters(OperationType operation, AddUserInfo instance, List<DbParameter> parameters)
        {
            switch (operation)
            {

                case OperationType.Update:
                    parameters.Add(DbHelper.CreateParameter("UserMasterID", instance.UserMasterID));

                    break;
                default:
                    break;
            }
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Update:
                    spName = "USP_UserEnableAndDisable";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override AddUserInfo Parse(System.Data.DataRow data)
        {
            return new AddUserInfo
            {


            };
        }
    }

    public class DataAccessForgetPassward : DataAccessRepository<ForgetPassward, Int32>
    {
        public Int32 AddForgetPassword(ForgetPassward instance)
        {
            return Add(instance);
        }
        protected override void FillParameters(OperationType operation, ForgetPassward instance, List<DbParameter> parameters)
        {
            switch (operation)
            {

                case OperationType.Add:
                    parameters.Add(DbHelper.CreateParameter("EmailId", instance.EmailId));

                    break;
                default:
                    break;
            }
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Add:
                    spName = "USP_ForgotPassword";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override ForgetPassward Parse(System.Data.DataRow data)
        {
            return new ForgetPassward
            {
                ToCheckId = data.Read<Int32>("ToCheckId")
            };
        }

     
    }
}
