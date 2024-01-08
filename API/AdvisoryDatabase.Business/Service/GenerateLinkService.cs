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
    public class GenerateLinkService : Repository<GenerateLink, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GenerateLink, int> CreateDalManager()
        {
            return new DataAccessGenerateLink();
        }
    }

    public class GenerateResendLinkService : Repository<GenerateLink, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<GenerateLink, int> CreateDalManager()
        {
            return new DataAccessGenerateResendLink();
        }
    }
}
