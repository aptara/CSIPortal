using AdvisoryDatabase.Framework.Entities;
using AdvisoryDatabase.Framework.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace AdvisoryDatabase.WebAPI.Controllers
{
  public class GetClientController : ApiController
  {
    // GET: GetClient
    //public ActionResult Index()
    //{
    //    return View();
    //}
    //[System.Web.Http.Route("GetClientList")]
    [System.Web.Http.HttpGet]
    public APIResponse<List<clientList>> GetClientList()
    {
      AdvisoryDatabase.Business.Controllers.GetClientController GetClientController = new Business.Controllers.GetClientController();
      return GetClientController.GetClientList();
    }

    //[System.Web.Http.Route("GetClientDetailsList")]
    [System.Web.Http.HttpPost]
    public APIResponse<List<clientDetailsList>> GetClientDetailsList([FromBody] clientDetailsList obj)
    {
      //clientDetailsList obj = new clientDetailsList();
      AdvisoryDatabase.Business.Controllers.GetClientController GetClientController = new Business.Controllers.GetClientController();
      return GetClientController.GetClientDetailsList(obj);
    }

    [System.Web.Http.HttpPost]
    public APIResponse<List<clientList>> GetClientForTop([FromBody] clientList obj)
    {
      AdvisoryDatabase.Business.Controllers.GetClientController GetClientController = new Business.Controllers.GetClientController();
      return GetClientController.GetClientForTop(obj);
    }

    [System.Web.Http.HttpPost]
    public APIResponse<List<clientFeedback>> GetClientFeedback([FromBody] clientFeedback obj)
    {
      //clientDetailsList obj = new clientDetailsList();
      AdvisoryDatabase.Business.Controllers.GetClientController GetClientController = new Business.Controllers.GetClientController();
      return GetClientController.GetClientFeedback(obj);
    }
  }
}

