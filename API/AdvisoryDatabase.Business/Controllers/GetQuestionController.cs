using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdvisoryDatabase.Business.Service;
using AdvisoryDatabase.Framework.Entities;
using AdvisoryDatabase.Framework.Logger;
using AdvisoryDatabase.Framework.Response;


namespace AdvisoryDatabase.Business.Controllers
{
  public class GetQuestionController : BaseController
  {
    /* public List<GetQuestion> GetQuestionDetail()
     {
       List<GetQuestion> GetQuestions = new List<GetQuestion>();
       try
       {
         GetQuestionService service = new GetQuestionService();
         GetQuestions = service.GetAll();

       }
       catch (Exception ex)
       {

         Log4NetLogger.Error(ex.Message);
       }

       return GetQuestions;
     }*/

    public APIResponse<List<GetQuestion>> GetQuestionDetail()
    {
      try
      {
        GetQuestionService service = new GetQuestionService();
        return SuccessReponse(service.GetAll());
      }
      catch (Exception ex)
      {
        var error = LogError(ex);
        return Erroresponse<List<GetQuestion>>(error);
      }
    }


    //
    public APIResponse<GetQuestion> PostQuestionDetail(GetQuestion ObjInputParameters)

    {
   
      try
      {
        GetQuestionService service = new GetQuestionService();
        ///return SuccessReponse(service.Add(ObjInputParameters));
       ObjInputParameters.QuestionId = service.Add(ObjInputParameters);
       
       

      }
      catch (Exception ex)
      {

        Log4NetLogger.Error(ex.Message);
       // return Erroresponse<ObjInputParameters>(error);
      }
      return SuccessReponse(ObjInputParameters);

    }




    /*  public List<GetQuestion> GetQuestionDetail()
              {
                List<GetQuestion> getQuestions = new List<GetQuestion>();
                try
                {
                  GetQuestionService service = new GetQuestionService();
                  getQuestions = service.GetAll();
                }
                catch (Exception ex)
                {
                  Log4NetLogger.Error(ex.Message);
                  // Handle the exception if needed
                }

                return getQuestions;
              }*/
  }


}
