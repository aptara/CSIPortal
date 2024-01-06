using AdvisoryDatabase.Framework.Entities;
using AdvisoryDatabase.Framework.Response;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace AdvisoryDatabase.WebAPI.Controllers
{
    public class GetProjectController : ApiController
    {
        // GET: GetProject
        /*  public ActionResult Index()
          {
              return View();
          }*/

        [System.Web.Http.HttpPost]
        public APIResponse<List<GetProject>> GetProject([FromBody] GetProject obj)
        {
            AdvisoryDatabase.Business.Controllers.GetProjectController GetProjectController = new Business.Controllers.GetProjectController();
            return GetProjectController.GetProject(obj);
        }

        [System.Web.Http.HttpPost]
        public APIResponse<List<GetProjectDeatils>> GetProjectDetails([FromBody] GetProjectDeatils obj)
        {
            AdvisoryDatabase.Business.Controllers.GetProjectController GetProjectController = new Business.Controllers.GetProjectController();
            return GetProjectController.GetProjectDetails(obj);
        }

        [System.Web.Http.HttpPost]
        public APIResponse<GetProjectDeatils> AddProjectDetails([FromBody] GetProjectDeatils obj)
        {
            AdvisoryDatabase.Business.Controllers.GetProjectController GetProjectController = new Business.Controllers.GetProjectController();
            return GetProjectController.AddProjectDetails(obj);
        }

        [System.Web.Http.HttpPost]
        public HttpResponseMessage UpdateProjectDetails(GetProjectDeatils obj)
        {
            AdvisoryDatabase.Business.Controllers.GetProjectController GetProjectController = new Business.Controllers.GetProjectController();
            GetProjectDeatils ObjInputParameters = new GetProjectDeatils();
            ObjInputParameters = obj;
            ObjInputParameters.IsActive = true;
            ObjInputParameters.ProjectId = obj.ProjectId;
            ObjInputParameters.ProjectName = obj.ProjectName;

            GetProjectDeatils UserDataByUID = new GetProjectDeatils();
            var UserId = obj.ProjectId;
            List<GetProjectDeatils> UserOutput = GetProjectController.UpdateProjectDetails(ObjInputParameters);
            string jsonData = JsonConvert.SerializeObject(UserOutput);
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            AdvisoryDatabase.Framework.Logger.AdvisoryLogger.WriteInfo("UpdateData Method Record Count :" + UserOutput.Count);
            return response;
            // return GetProjectController.UpdateProjectDetails(obj);
        }


        [System.Web.Http.HttpDelete]
        public APIResponse<string> DeleteProjectDetails(int Id)
        {
            AdvisoryDatabase.Business.Controllers.GetProjectController GetProjectController = new Business.Controllers.GetProjectController();
            return GetProjectController.DeleteProjectDetails(Id);
        }

        [System.Web.Http.HttpGet]
        public APIResponse<GetProjectDeatils> GetProjectDetailsById(int Id)
        {
            GetProjectDeatils projectDeatils = new GetProjectDeatils();
            projectDeatils.ProjectId = Id;
            AdvisoryDatabase.Business.Controllers.GetProjectController GetProjectController = new Business.Controllers.GetProjectController();
            AdvisoryDatabase.Framework.Logger.AdvisoryLogger.WriteInfo("GetCourse : Project Id " + Id);
            return GetProjectController.GetProjectDetailsById(projectDeatils);
        }

        [System.Web.Http.HttpPost]
        public APIResponse<GetProjectDeatils> EnableProject(GetProjectDeatils Id)
        {
            AdvisoryDatabase.Business.Controllers.GetProjectController GetProjectController = new Business.Controllers.GetProjectController();
            return GetProjectController.EnableProject(Id);
        }
    }
}