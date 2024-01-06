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
    public class GenerateLinkController : ApiController
    {
        //[System.Web.Http.HttpPost]
        //public APIResponse<List<GenerateLink>> GenerateLink([FromBody] GenerateLink obj)
        //{
        //    AdvisoryDatabase.Business.Controllers.GenerateLinkController GenerateLinkController = new Business.Controllers.GenerateLinkController();
        //    return GenerateLinkController.GenerateLink(obj);
        //}

        [System.Web.Http.HttpPost]
        public APIResponse<GenerateLink> GenerateLink([FromBody] GenerateLink obj)
        {            
            AdvisoryDatabase.Business.Controllers.GenerateLinkController objGenerateLinkController = new Business.Controllers.GenerateLinkController();

            return objGenerateLinkController.GenerateLink(obj);

        }

        [System.Web.Http.HttpPost]
        public APIResponse<GenerateLink> GenerateRecentLink([FromBody] GenerateLink obj)
        {
            AdvisoryDatabase.Business.Controllers.GenerateLinkController objGenerateLinkController = new Business.Controllers.GenerateLinkController();

            return objGenerateLinkController.GenerateRecentLink(obj);

        }
    }
}