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
  public class GetClientService : Repository<clientList, Int32>
  {
    protected override DataAccess.Repository.DataAccessRepository<clientList, int> CreateDalManager()
    {
      return new DataAccessGetClient();
    }
  }

  public class GetClientDetailsService : Repository<clientDetailsList, Int32>
  {
    protected override DataAccess.Repository.DataAccessRepository<clientDetailsList, int> CreateDalManager()
    {
      return new DataAccessGetClientDetails();
    }
  }

  public class GetClientForTopService : Repository<clientList, Int32>
  {
    protected override DataAccess.Repository.DataAccessRepository<clientList, int> CreateDalManager()
    {
      return new DataAccessGetClientForTop();
    }
  }

  public class GetClientFeedbackService : Repository<clientFeedback, Int32>
  {
    protected override DataAccess.Repository.DataAccessRepository<clientFeedback, int> CreateDalManager()
    {
      return new DataAccessGetClientFeedback();
    }
  }

}
