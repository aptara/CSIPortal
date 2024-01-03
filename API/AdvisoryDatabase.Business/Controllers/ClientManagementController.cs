using AdvisoryDatabase.Business.Service;
using AdvisoryDatabase.DataAccess.DataAccessService;
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
    public class ClientManagementController : BaseController
    {
        public APIResponse<AddClientInfo> AddClientDetail(AddClientInfo obj)
        {
            try
            {
                AddClientDetail service = new AddClientDetail();
                obj.ClientId = (service.Add(obj));
            }
            catch (Exception ex)
            {
                Log4NetLogger.Error(ex.Message);
            }
            return SuccessReponse(obj);
        }
        public APIResponse<AddClientInfo> GetClient(AddClientInfo client)
        {
            try
            {
                GetClientDetail service = new GetClientDetail();
                return SuccessReponse(service.Get(client));
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<AddClientInfo>(error);
            }          
        }
        
        public APIResponse<AddClientInfo> UpdateClientInfo(AddClientInfo obj)
        {
            try
            {
                AddClientDetail service = new AddClientDetail();
                service.Update(obj);
                return SuccessReponse(obj);
                //obj.ClientId = service.Update(obj);
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<AddClientInfo>(error);
            }
        }
        public APIResponse<string> DeleteClient(int ClientID)
        {
            try
            {
                DeleteClient service = new DeleteClient();
                service.Remove(ClientID);
                return SuccessReponse("Success");
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<string>(error);
            }
        }

        public APIResponse<AddClientInfo> EnableClient(AddClientInfo obj)
        {
            try
            {
                EnableClientService service = new EnableClientService();
                service.Update(obj);
                return SuccessReponse(obj);
                //obj.ClientId = service.Update(obj);
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<AddClientInfo>(error);
            }
        }

        public APIResponse<List<AddClientInfo>> GetClientList(AddClientInfo obj)
        {
            try
            {
                AddClientDetail service = new AddClientDetail();
                return SuccessReponse(service.GetAll(obj));
            }
            catch (Exception ex)
            {
                var error = LogError(ex);
                return Erroresponse<List<AddClientInfo>>(error);
            }
        }
    }
}
