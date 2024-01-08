using AdvisoryDatabase.Business.Service;
using AdvisoryDatabase.Framework.Entities;
using AdvisoryDatabase.Framework.Logger;
using AdvisoryDatabase.Framework.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Business.Controllers
{
    public class GenerateLinkController: BaseController
    {
        //public APIResponse<List<GenerateLink>> GenerateLink(GenerateLink obj)
        //{
        //    try
        //    {
        //        GenerateLinkService service = new GenerateLinkService();
        //        return SuccessReponse(service.Add(obj));
        //    }
        //    catch (Exception ex)
        //    {
        //        var error = LogError(ex);
        //        return Erroresponse<List<GenerateLink>>(error);
        //    }
        //}

        public APIResponse<GenerateLink> GenerateLink(GenerateLink ObjInputParameters)
        {

            try
            {
                GenerateLinkService service = new GenerateLinkService();
                //return SuccessReponse(service.Add(ObjInputParameters));
                ObjInputParameters.ClientId = service.Add(ObjInputParameters);
            }
            catch (Exception ex)
            {

                Log4NetLogger.Error(ex.Message);
                // return Erroresponse<ObjInputParameters>(error);
            }
            return SuccessReponse(ObjInputParameters);

        }

        
        public APIResponse<GenerateLink> GenerateResendLink(GenerateLink ObjInputParameters)
        {

            try
            {
                GenerateResendLinkService service = new GenerateResendLinkService();
                //return SuccessReponse(service.Add(ObjInputParameters));
                ObjInputParameters.ClientId = service.Add(ObjInputParameters);
            }
            catch (Exception ex)
            {

                Log4NetLogger.Error(ex.Message);
                // return Erroresponse<ObjInputParameters>(error);
            }
            return SuccessReponse(ObjInputParameters);

        }
    }
}
