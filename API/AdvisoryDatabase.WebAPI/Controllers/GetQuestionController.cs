using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using AdvisoryDatabase.Framework.Entities;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.IO;
using AdvisoryDatabase.Business;
using AdvisoryDatabase.Framework.Logger;
using System.Web.Http.Results;
using System.Web.Script.Serialization;

using AdvisoryDatabase.Business.Controllers;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using System.Web.Mvc;

using AdvisoryDatabase.Framework.Response;
using HttpPostAttribute = System.Web.Mvc.HttpPostAttribute;
using AdvisoryDatabase.Framework.Common;

namespace AdvisoryDatabase.WebAPI.Controllers
{
    public class GetQuestionController : ApiController
    {
        //http://localhost:62220/api/GetQuestion/GetQuestionDetail

        [HttpGet]
        public APIResponse<List<GetQuestion>> GetQuestionDetail()
        {           
            AdvisoryDatabase.Business.Controllers.GetQuestionController GetQuestionController = new Business.Controllers.GetQuestionController();
            return GetQuestionController.GetQuestionDetail(); 
        }

    [HttpPost]
    public APIResponse<GetQuestion> PostQuestionDetail(List<GetQuestion> ObjGetQuestionList)
    {
      GetQuestion ObjGetQuestion = new GetQuestion();
      string xmlString = Utility.Serialize(ObjGetQuestionList);
      ObjGetQuestion.PostQuestionXML = xmlString;
      AdvisoryDatabase.Business.Controllers.GetQuestionController GetQuestionController = new Business.Controllers.GetQuestionController();

      return GetQuestionController.PostQuestionDetail(ObjGetQuestion);

    }
/*
    [HttpGet]
    public APIResponse<List<GetQuestion>> GetClientDetail()
    {
      AdvisoryDatabase.Business.Controllers.GetQuestionController GetQuestionController = new Business.Controllers.GetQuestionController();
      return GetQuestionController.GetQuestionDetail();
    }
*/



  }
}
