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
    public class ChangePasswordController : BaseController
    {
        public APIResponse<changePassword> ChangePassword(changePassword obj)
        {          
            try
            {
                ChangePasswordService service = new ChangePasswordService();
                service.Add(obj);
                return SuccessReponse(obj);
            }

            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<changePassword>(error);
            }
        }
    }
}
