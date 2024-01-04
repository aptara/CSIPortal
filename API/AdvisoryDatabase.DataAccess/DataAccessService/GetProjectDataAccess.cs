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
            parameters.Add(DbHelper.CreateParameter("RoleId", instance.RoleId));
            parameters.Add(DbHelper.CreateParameter("UserMasterID", instance.UserMasterID));
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


    public class GetProjectDetailsDataAccess : DataAccessRepository<GetProjectDeatils, Int32>
    {
        protected override void FillParameters(OperationType operation, GetProjectDeatils instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("IsIncludeDeleted", instance.IsIncludeDeleted));
            //throw new NotImplementedException();
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.GetAll:
                    spName = "USP_ManageProjectDetails";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetProjectDeatils Parse(System.Data.DataRow data)
        {
            return new GetProjectDeatils
            {
                ProjectId = data.Read<Int32>("ProjectId"),
                ProjectName = data.ReadString("ProjectName"),
                CreatedBy = data.Read<int>("CreatedBy"),
                CreatedOn = data.Read<DateTime>("CreatedOn"),
                LastUpdatedBy = data.Read<int>("LastUpdatedBy"),
                LastUpdatedOn = data.Read<DateTime>("LastUpdatedOn"),
                IsActive = data.Read<bool>("IsActive"),
            };
        }
    }

    public class AddProjectDetailsDataAccess : DataAccessRepository<GetProjectDeatils, Int32>
    {
        protected override void FillParameters(OperationType operation, GetProjectDeatils instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
            parameters.Add(DbHelper.CreateParameter("ProjectName", instance.ProjectName));
            parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Add:
                    spName = "USP_ManageProjectDetails";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetProjectDeatils Parse(System.Data.DataRow data)
        {
            return new GetProjectDeatils
            {
                //ProjectId = data.Read<Int32>("ProjectId"),
                //ProjectName = data.ReadString("ProjectName"),
            };
        }
    }

    public class UpdateProjectDetailsDataAccess : DataAccessRepository<GetProjectDeatils, Int32>
    {
        protected override void FillParameters(OperationType operation, GetProjectDeatils instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
            parameters.Add(DbHelper.CreateParameter("ProjectName", instance.ProjectName));
            parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
            parameters.Add(DbHelper.CreateParameter("IsActive", instance.IsActive));
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Update:
                    spName = "USP_ManageProjectDetails";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetProjectDeatils Parse(System.Data.DataRow data)
        {
            return new GetProjectDeatils
            {
                //ProjectId = data.Read<Int32>("ProjectId"),
                //ProjectName = data.ReadString("ProjectName"),
            };
        }
    }

    public class DeleteProjectDetailsDataAccess : DataAccessRepository<GetProjectDeatils, Int32>
    {
        protected override void FillParameters(OperationType operation, GetProjectDeatils instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
            parameters.Add(DbHelper.CreateParameter("IsActive", instance.IsActive));
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Delete:
                    spName = "USP_ManageProjectDetails";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetProjectDeatils Parse(System.Data.DataRow data)
        {
            return new GetProjectDeatils
            {

            };
        }
    }

    public class GetProjectDetailsByIdDataAccess : DataAccessRepository<GetProjectDeatils, Int32>
    {
        protected override void FillParameters(OperationType operation, GetProjectDeatils instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
            parameters.Add(DbHelper.CreateParameter("IsActive", instance.IsActive));
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Get:
                    spName = "USP_ManageProjectDetails";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetProjectDeatils Parse(System.Data.DataRow data)
        {
            return new GetProjectDeatils
            {
                ProjectId = data.Read<Int32>("ProjectId"),
                ProjectName = data.ReadString("ProjectName"),
                IsActive = data.Read<bool>("IsActive"),
            };
        }
    }


    public class DataAccessEnableProject : DataAccessRepository<GetProjectDeatils, Int32>
    {
        protected override void FillParameters(OperationType operation, GetProjectDeatils instance, List<DbParameter> parameters)
        {
            parameters.Add(DbHelper.CreateParameter("ProjectId", instance.ProjectId));
          /*  parameters.Add(DbHelper.CreateParameter("IsActive", instance.IsActive));*/
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.Update:
                    spName = "USP_ProjectEnableAndDisable";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override GetProjectDeatils Parse(System.Data.DataRow data)
        {
            return new GetProjectDeatils
            {

            };
        }
    }
}

    
