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
   
    public class GetProjectService : Repository<GetProject, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetProject, int> CreateDalManager()
        {
            return new GetProjectDataAccess();
        }
    }

    public class GetProjectDetailService : Repository<GetProjectDeatils, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetProjectDeatils, int> CreateDalManager()
        {
            return new GetProjectDetailsDataAccess();
        }

    }

    public class AddProjectDetailService : Repository<GetProjectDeatils, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetProjectDeatils, int> CreateDalManager()
        {
            return new AddProjectDetailsDataAccess();
        }
    }

    public class UpdateProjectDetailService : Repository<GetProjectDeatils, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetProjectDeatils, int> CreateDalManager()
        {
            return new UpdateProjectDetailsDataAccess();
        }
        public int GetUpdatedUserMasterID(GetProjectDeatils projectDetail)
        {

            int updatedProjectId = projectDetail.ProjectId;
            return updatedProjectId;
        }
    }

    public class DeleteProjectDetailService : Repository<GetProjectDeatils, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetProjectDeatils, int> CreateDalManager()
        {
            return new DeleteProjectDetailsDataAccess();
        }
    }

    public class GetProjectProjectDetailByService : Repository<GetProjectDeatils, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetProjectDeatils, int> CreateDalManager()
        {
            return new GetProjectDetailsByIdDataAccess();
        }
    }
    public class EnableProjectService : Repository<GetProjectDeatils, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GetProjectDeatils, int> CreateDalManager()
        {
            return new DataAccessEnableProject();
        }
    }

}
