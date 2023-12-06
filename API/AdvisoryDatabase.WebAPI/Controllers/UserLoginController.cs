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
    public class UserLoginController : ApiController
    {

        [System.Web.Http.HttpPost]
        public APIResponse<List<UserLogin>> GetUserLoginDetails(UserLogin obj)
        {
            //clientDetailsList obj = new clientDetailsList();
            AdvisoryDatabase.Business.Controllers.UserLoginController userLoginController = new Business.Controllers.UserLoginController();
            return userLoginController.GetUserLoginDetails(obj);
        }

        // GET: UserLogin
        //public ActionResult Index()
        //{
        //    return View();
        //}
    }
}