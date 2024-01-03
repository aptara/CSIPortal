using AdvisoryDatabase.Business.Repository;
using AdvisoryDatabase.Framework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.DataAccess.DataAccessService
{
    public class AddClientDetail : Repository<AddClientInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddClientInfo, int> CreateDalManager()
        {
            return new DataAccessClientManagement();
        }
    }    
    public class GetClientDetail : Repository<AddClientInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddClientInfo, int> CreateDalManager()
        {
            return new DataAccessClientManagement();
        }
    }

    public class UpdateClientDetail : Repository<AddClientInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddClientInfo, int> CreateDalManager()
        {
            return new DataAccessClientManagement();
        }
    }
    public class DeleteClient : Repository<AddClientInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddClientInfo, int> CreateDalManager()
        {
            return new DataAccessClientManagement();
        }

    }

    public class EnableClientService : Repository<AddClientInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddClientInfo, int> CreateDalManager()
        {
            return new DataAccessEnableClient();
        }
    }

    public class GetClientService : Repository<AddClientInfo, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<AddClientInfo, int> CreateDalManager()
        {
            return new DataAccessClientManagement();
        }
    }
}
