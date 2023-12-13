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
  

        public class GetProjectDataAccess : DataAccessRepository<GetProject, Int32>
        {

            protected override void FillParameters(OperationType operation, GetProject instance, List<DbParameter> parameters)
            {
            parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
        }

            protected override string GetProcedureName(OperationType operation)
            {
                string spName = string.Empty;
                switch (operation)
                {
                    case OperationType.GetAll:
                        spName = "USP_GetProjects";
                        break;
                    default:
                        spName = string.Empty;
                        break;
                }
                return spName;
            }

            protected override GetProject Parse(System.Data.DataRow data)
            {
                return new GetProject
                {
                    ClientId = data.Read<Int32>("ClientId"),

                    ProjectName = data.ReadString("ProjectName"),
                    ProjectId = data.Read<Int32>("ProjectId"),

                };
            }
        }
    }

    
