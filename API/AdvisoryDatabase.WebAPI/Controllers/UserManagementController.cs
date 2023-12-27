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
    public class UserManagementController : ApiController
    {
        // GET: UserManagement
        /* public ActionResult Index()
         {
             return View();
         }*/

        [System.Web.Http.HttpGet]
        public APIResponse<List<RoleMangement>> GetRole()
        {
            AdvisoryDatabase.Business.Controllers.UserManagementController UserManagementController = new Business.Controllers.UserManagementController();
            return UserManagementController.GetRole();
        }


        [System.Web.Http.HttpPost]
        public APIResponse<List<AddUserInfo>> AddUserInfo([FromBody] AddUserInfo obj)
        {
            AdvisoryDatabase.Business.Controllers.UserManagementController UserManagementController = new Business.Controllers.UserManagementController();
            return UserManagementController.AddUserDetail(obj);
        }
    }
}