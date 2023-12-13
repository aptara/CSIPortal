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
    public class GetProjectController : ApiController
    {
        // GET: GetProject
        /*  public ActionResult Index()
          {
              return View();
          }*/

        [System.Web.Http.HttpPost]
        public APIResponse<List<GetProject>> GetProject([FromBody] GetProject obj)
        {
            AdvisoryDatabase.Business.Controllers.GetProjectController GetProjectController = new Business.Controllers.GetProjectController();
            return GetProjectController.GetProject(obj);
        }
    }
}