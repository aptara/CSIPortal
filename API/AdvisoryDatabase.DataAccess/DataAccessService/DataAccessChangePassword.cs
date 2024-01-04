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
    public class DataAccessChangePassword : DataAccessRepository<changePassword, Int32>
    {
        protected override void FillParameters(OperationType operation, changePassword instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("UserMasterID", instance.UserMasterID));
            parameters.Add(DbHelper.CreateParameter("NewPassword", instance.NewPassword));                     
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Add:
                    spName = "USP_ChangePassword";
                    break;                
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override changePassword Parse(System.Data.DataRow data)
        {
            return new changePassword
            {
                
            };
        }
    }
}
