using AdvisoryDatabase.Business.Service;
using AdvisoryDatabase.Framework.Entities;
using AdvisoryDatabase.Framework.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Business.Controllers
{
  public class GetClientController : BaseController
  {
    public APIResponse<List<clientList>> GetClientList()
    {
      try
      {
        GetClientService service = new GetClientService();
        return SuccessReponse(service.GetAll());
      }
      catch (Exception ex)
      {
        var error = LogError(ex);
        return Erroresponse<List<clientList>>(error);
      }
    }

    public APIResponse<List<clientDetailsList>> GetClientDetailsList(clientDetailsList obj)
    {
      try
      {
        GetClientDetailsService service = new GetClientDetailsService();
        return SuccessReponse(service.GetAll(obj));
      }
      catch (Exception ex)
      {
        var error = LogError(ex);
        return Erroresponse<List<clientDetailsList>>(error);
      }
    }


    public APIResponse<List<clientList>> GetClientForTop(clientList obj)
    {
      try
      {
        GetClientForTopService service = new GetClientForTopService();
        return SuccessReponse(service.GetAll(obj));
      }
      catch (Exception ex)
      {
        var error = LogError(ex);
        return Erroresponse<List<clientList>>(error);
      }
    }

    public APIResponse<List<clientFeedback>> GetClientFeedback(clientFeedback obj)
    {
      try
      {
        GetClientFeedbackService service = new GetClientFeedbackService();
        return SuccessReponse(service.GetAll(obj));
      }
      catch (Exception ex)
      {
        var error = LogError(ex);
        return Erroresponse<List<clientFeedback>>(error);
      }
    }

  }
}
