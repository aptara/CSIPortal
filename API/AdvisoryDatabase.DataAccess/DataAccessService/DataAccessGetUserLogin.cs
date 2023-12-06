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
    public class DataAccessGetUserLogin : DataAccessRepository<UserLogin, Int32>
    {
        protected override void FillParameters(OperationType operation, UserLogin instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("EmailId", instance.EmailId));
            parameters.Add(DbHelper.CreateParameter("Password", instance.Password));
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.GetAll:
                    spName = "USP_ValidateUser";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override UserLogin Parse(System.Data.DataRow data)
        {
            return new UserLogin
            {
                UserMasterID = data.Read<Int32>("UserMasterID"),
                FirstName = data.ReadString("FirstName"),
                LastName = data.ReadString("LastName"),
                EmailId = data.ReadString("EmailId"),
                Password = data.ReadString("Password")
            };
        }
    }
}
