using AdvisoryDatabase.Business.Service;
using AdvisoryDatabase.Framework.Entities;
using AdvisoryDatabase.Framework.Logger;
using AdvisoryDatabase.Framework.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AddUserInfo = AdvisoryDatabase.Framework.Entities.AddUserInfo;

namespace AdvisoryDatabase.Business.Controllers
{
   public class UserManagementController:BaseController
    {
        public APIResponse<List<RoleMangement>> GetRole()
        {
            try
            {
                UserManagement service = new UserManagement();
                return SuccessReponse(service.GetAll());
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<List<RoleMangement>>(error);
            }
        }

        public APIResponse<List<AddUserInfo>> AddUserDetail(AddUserInfo obj)
        {
            try
            {
                AddUserInfoDetail service = new AddUserInfoDetail();
                return SuccessReponse(service.GetAll(obj));
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<List<AddUserInfo>>(error);
            }
        }
    }
}
