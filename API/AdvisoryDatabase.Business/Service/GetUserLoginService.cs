﻿using AdvisoryDatabase.Business.Repository;
using AdvisoryDatabase.DataAccess.DataAccessService;
using AdvisoryDatabase.Framework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Business.Service
{
    public class GetUserLoginService : Repository<UserLogin, Int32>
    {
        protected override DataAccess.Repository.DataAccessRepository<UserLogin, int> CreateDalManager()
        {
            return new DataAccessGetUserLogin();
        }
    }
}
