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



        [System.Web.Http.HttpPost]
        public APIResponse<List<GetUserDetail>> GetUserInfo([FromBody] GetUserDetail obj)
        {
            AdvisoryDatabase.Business.Controllers.UserManagementController UserManagementController = new Business.Controllers.UserManagementController();
            return UserManagementController.GetUserInfo(obj);
        }




        [System.Web.Http.HttpPost]
        public APIResponse<List<GetUserDetail>> GetUserDetailById([FromBody]GetUserDetail obj)
        {
            AdvisoryDatabase.Business.Controllers.UserManagementController UserManagementController = new Business.Controllers.UserManagementController();
            return UserManagementController.GetUserDetailById(obj);
        }


        [System.Web.Http.HttpPost]
        public APIResponse<AddUserInfo> UpdateUser([FromBody] AddUserInfo obj)
        {
            AdvisoryDatabase.Business.Controllers.UserManagementController UserManagementController = new Business.Controllers.UserManagementController();
            
            obj.LastUpdatedBy = 1;
            obj.CreatedBy = 1;
            return UserManagementController.UpdateUser(obj);

        }
   
    [System.Web.Http.HttpDelete]
        public APIResponse<string> DeleteUser(int Id)
        {
            AdvisoryDatabase.Business.Controllers.UserManagementController UserManagementController = new Business.Controllers.UserManagementController();
            return UserManagementController.DeleteUser(Id);
        }

        [System.Web.Http.HttpPost]
        public APIResponse<AddUserInfo> EnableUser([FromBody] AddUserInfo obj)
        {
            AdvisoryDatabase.Business.Controllers.UserManagementController UserManagementController = new Business.Controllers.UserManagementController();

            obj.LastUpdatedBy = 1;
            obj.CreatedBy = 1;
            return UserManagementController.EnableUser(obj);

        }

        [System.Web.Http.HttpPost]
        public APIResponse<ForgetPassward> ForgetPassward([FromBody] ForgetPassward obj)
        {
            AdvisoryDatabase.Business.Controllers.UserManagementController UserManagementController = new Business.Controllers.UserManagementController();

            return UserManagementController.ForgetPassward(obj);

        }
    }
}