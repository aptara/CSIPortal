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
    
    public APIResponse<List<GetUserDetail>> GetUserInfo(GetUserDetail obj)
    {
        try
        {
            GetserInfoDetail service = new GetserInfoDetail();
            return SuccessReponse(service.GetAll(obj));
        }
        catch (Exception ex)
        {
            var error = LogError(ex);
            return Erroresponse<List<GetUserDetail>>(error);
        }
    }


    public APIResponse<List<GetUserDetail>> GetUserDetailById(GetUserDetail obj)
        {
            try
            {
                GetserInfoDetailById service = new GetserInfoDetailById();
                return SuccessReponse(service.GetAll(obj));
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<List<GetUserDetail>>(error);
            }
        }

        public APIResponse<AddUserInfo>UpdateUser(AddUserInfo obj)
        {
            List<AddUserInfo> Userdata = new List<AddUserInfo>();
            try
            {
                UpdateUser service = new UpdateUser();
                 service.Update(obj);
                return SuccessReponse(obj);
            }

            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<AddUserInfo>(error);
            }

  
        }


        public APIResponse<string> DeleteUser(int UserMasterID)
        {           
            try
            {
                DeleteUser service = new DeleteUser();
                service.Remove(UserMasterID);
                return SuccessReponse("Success");
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<string>(error);
            }
        }

        public APIResponse<AddUserInfo> EnableUser( AddUserInfo obj)
        {
            try
            {
                EnableUser service = new EnableUser();
                service.Update(obj);
                return SuccessReponse(obj);
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<AddUserInfo>(error);
            }
        }

        public APIResponse<ForgetPassward> ForgetPassward(ForgetPassward obj)
        {
            try
            {
                ForgetPasswardService service = new ForgetPasswardService();
                service.Add(obj);
                return SuccessReponse(obj);
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<ForgetPassward>(error);
            }
        }
    }
}
