using AdvisoryDatabase.Business.Controllers;
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
    public class ClientManagementController : ApiController
    {
        [System.Web.Http.HttpPost]
        public APIResponse<AddClientInfo> AddClientInfo([FromBody] AddClientInfo obj)
        {
            AdvisoryDatabase.Business.Controllers.ClientManagementController clientManagementController = new Business.Controllers.ClientManagementController();
            return clientManagementController.AddClientDetail(obj);
        }

        [System.Web.Http.HttpPost]
        public APIResponse<AddClientInfo> GetClient([FromBody] AddClientInfo obj)
        {
            AdvisoryDatabase.Business.Controllers.ClientManagementController clientManagementController = new Business.Controllers.ClientManagementController();
            return clientManagementController.GetClient(obj);
        }

        [System.Web.Http.HttpPost]
        public APIResponse<AddClientInfo> UpdateClientInfo([FromBody] AddClientInfo obj)
        {
            AdvisoryDatabase.Business.Controllers.ClientManagementController clientManagementController = new Business.Controllers.ClientManagementController();
            return clientManagementController.UpdateClientInfo(obj);
        }
    }
}