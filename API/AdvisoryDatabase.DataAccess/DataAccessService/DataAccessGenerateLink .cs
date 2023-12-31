﻿using AdvisoryDatabase.DataAccess.Common;
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
    public class DataAccessGenerateLink : DataAccessRepository<GenerateLink, Int32>
    {


        protected override void FillParameters(OperationType operation, GenerateLink instance, List<DbParameter> parameters)
        {
            switch (operation)
            {
                case OperationType.Add:
                    parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
                    parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
                  
                    parameters.Add(DbHelper.CreateParameter("Remark", instance.Remark));
                    parameters.Add(DbHelper.CreateParameter("ReviewerName", instance.ReviewerName));
                    parameters.Add(DbHelper.CreateParameter("ReviewerEmail", instance.ReviewerEmail));
                    break;
            }           
     
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Add:
                    spName = "USP_PostGeneratedLinkMaster";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GenerateLink Parse(System.Data.DataRow data)
        {
            return new GenerateLink
            {
                /*  ClientId = data.Read<Int32>("ClientId"),

                  ProjectName = data.ReadString("ProjectName"),
                  AptaraContact = data.ReadString("AptaraContact"),
                  AptaraContact2 = data.ReadString("AptaraContact2")*/

            };
        }
    }

    public class DataAccessGenerateResendLink : DataAccessRepository<GenerateLink, Int32>
    {
        protected override void FillParameters(OperationType operation, GenerateLink instance, List<DbParameter> parameters)
        {
            switch (operation)
            {
                case OperationType.Add:
                    parameters.Add(DbHelper.CreateParameter("LinkGUID", instance.LinkGUID));
                    parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
                    parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
                    break;
            }

        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Add:
                    spName = "USP_PostResendGeneratedLinkMaster";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GenerateLink Parse(System.Data.DataRow data)
        {
            return new GenerateLink
            {
                /*  ClientId = data.Read<Int32>("ClientId"),

                  ProjectName = data.ReadString("ProjectName"),
                  AptaraContact = data.ReadString("AptaraContact"),
                  AptaraContact2 = data.ReadString("AptaraContact2")*/

            };
        }
    }
}
