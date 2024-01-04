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
    public class ChangePasswordService:Repository<changePassword, Int32>
    {     
        protected override DataAccess.Repository.DataAccessRepository<changePassword, int> CreateDalManager()
        {
            return new DataAccessChangePassword();
        }

    }
}
