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

    public class GetProjectController : BaseController
    {
        public APIResponse<List<GetProject>> GetProject(GetProject obj)
        {
            try
            {
                GetProjectService service = new GetProjectService();
                return SuccessReponse(service.GetAll(obj));
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<List<GetProject>>(error);
            }
        }
    }
}
