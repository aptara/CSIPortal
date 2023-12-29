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

        public APIResponse<List<GetProjectDeatils>> GetProjectDetails()
        {
            try
            {
                GetProjectDetailService service = new GetProjectDetailService();
                return SuccessReponse(service.GetAll());
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<List<GetProjectDeatils>>(error);
            }
        }

        public APIResponse<GetProjectDeatils> AddProjectDetails(GetProjectDeatils obj)
        {
            try
            {
                AddProjectDetailService service = new AddProjectDetailService();
                obj.ProjectId = service.Add(obj);
            }
            catch (Exception ex)
            {
                Log4NetLogger.Error(ex.Message);
                //return Erroresponse<List<AddProjectDetailService>>(error);
            }
            return SuccessReponse(obj);
        }

        public List<GetProjectDeatils> UpdateProjectDetails(GetProjectDeatils ObjInputParameters)
        {
            List<GetProjectDeatils> Userdata = new List<GetProjectDeatils>();
            try
            {
                UpdateProjectDetailService service = new UpdateProjectDetailService();
                service.Update(ObjInputParameters);

                int updatedProjectId = service.GetUpdatedUserMasterID(ObjInputParameters);
                ObjInputParameters.ProjectId = updatedProjectId;

            }
            catch (Exception ex)
            {

                Log4NetLogger.Error(ex.Message);
            }

            return Userdata;
        }

        public APIResponse<string> DeleteProjectDetails(int ProjectId)
        {
            try
            {
                DeleteProjectDetailService service = new DeleteProjectDetailService();
                service.Remove(ProjectId);
                return SuccessReponse("Success");
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<string>(error);
            }
        }

        public APIResponse<GetProjectDeatils> GetProjectDetailsById(GetProjectDeatils projectDeatils)
        {
            try
            {
                GetProjectProjectDetailByService service = new GetProjectProjectDetailByService();
                AdvisoryDatabase.Framework.Logger.AdvisoryLogger.WriteInfo("Business controller : GetCourse : ProjectId " + projectDeatils.ProjectId);
                return SuccessReponse(service.Get(projectDeatils));
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<GetProjectDeatils>(error);
            }

        }
    }
}
