using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;

namespace WKFS.WebAPI.Controllers
{
    public class HomeController : ApiController
    {

    [System.Web.Http.HttpGet]
    public string Index()
    {
      return "Advisory Database API is running";
    }

  }
}
