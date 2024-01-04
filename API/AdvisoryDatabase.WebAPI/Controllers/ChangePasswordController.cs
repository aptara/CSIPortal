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
    public class ChangePasswordController : ApiController
    {
        // GET: ChangePassword
        //public ActionResult Index()
        //{
        //    return View();
        //}

        [System.Web.Http.HttpPost]
        public APIResponse<changePassword> ChangePassword([FromBody] changePassword obj)
        {
            AdvisoryDatabase.Business.Controllers.ChangePasswordController changePasswordController = new Business.Controllers.ChangePasswordController();
            return changePasswordController.ChangePassword(obj);
        }
    }
}