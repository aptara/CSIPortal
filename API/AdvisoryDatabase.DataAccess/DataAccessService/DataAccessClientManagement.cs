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
    //class DataAccessClientManagement
    //{
    //}
    public class DataAccessClientManagement : DataAccessRepository<AddClientInfo, Int32>
    {
        protected override void FillParameters(OperationType operation, AddClientInfo instance, List<DbParameter> parameters)
        {
            //switch (operation)
            //{
            //case OperationType.Add:
            parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
            parameters.Add(DbHelper.CreateParameter("ClientName", instance.ClientName));
            parameters.Add(DbHelper.CreateParameter("EmailId", instance.ClientEmail));
            parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
            parameters.Add(DbHelper.CreateParameter("AptaraContact", instance.AptaraContact));
            parameters.Add(DbHelper.CreateParameter("AptaraContactEmail", instance.AptaraContactEmail));
                    //break;
                //case OperationType.Get:
                //    parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
                //    parameters.Add(DbHelper.CreateParameter("ClientName", instance.ClientName));
                ////    break;
            //}
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Get:
                    spName = "USP_ManageClient";
                    break;
                case OperationType.Add:
                    spName = "USP_ManageClient";
                    break;
                case OperationType.Update:
                    spName = "USP_ManageClient";
                    break;
                case OperationType.Delete:
                    spName = "USP_ManageClient";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override AddClientInfo Parse(System.Data.DataRow data)
        {
            return new AddClientInfo
            {
                ClientName= data.ReadString("ClientName"),
                ClientEmail= data.ReadString("ClientEmail"),
                AptaraContact= data.ReadString("AptaraContact2"),
                AptaraContactEmail = data.ReadString("AptaraContact"),
                ProjectId=data.ReadString("ProjectIds")
            };
        }
    }
}
