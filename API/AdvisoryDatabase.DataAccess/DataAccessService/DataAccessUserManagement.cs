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
            parameters.Add(DbHelper.CreateParameter("EmailId", instance.Email));
            parameters.Add(DbHelper.CreateParameter("RoleId", instance.Role));
            parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.GetAll:
                    spName = "USP_AddUser";
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
}
