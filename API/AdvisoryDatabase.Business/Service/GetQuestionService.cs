using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdvisoryDatabase.Business.Repository;
using AdvisoryDatabase.DataAccess.DataAccessService;
using AdvisoryDatabase.Framework.Entities;
using System.Data.SqlClient;
using AdvisoryDatabase.Framework.Logger;

namespace AdvisoryDatabase.Business.Service
{
  public class GetQuestionService : Repository<GetQuestion, Int32>
  {
    protected override DataAccess.Repository.DataAccessRepository<GetQuestion, int> CreateDalManager()
    {
      return new DataAccessGetQuestion();
    }
  }





  /*public class PostQuestionService : Repository<PostQuestion, Int32>
  {
    protected override DataAccess.Repository.DataAccessRepository<PostQuestion, int> CreateDalManager()
    {
      return new DataAccessPostQuestion();
    }
  }*/
}
