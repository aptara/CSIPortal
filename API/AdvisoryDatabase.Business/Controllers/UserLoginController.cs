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
    public class UserLoginController : BaseController
    {
        public APIResponse<List<UserLogin>> GetUserLoginDetails(UserLogin obj)
        {
            try
            {
                GetUserLoginService service = new GetUserLoginService();
                return SuccessReponse(service.GetAll(obj));
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<List<UserLogin>>(error);
            }
        }
    }
}
