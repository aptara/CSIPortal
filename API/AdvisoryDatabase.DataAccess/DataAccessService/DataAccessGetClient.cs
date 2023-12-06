using AdvisoryDatabase.DataAccess.Common;
using AdvisoryDatabase.DataAccess.Repository;
using AdvisoryDatabase.Framework.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.DataAccess.DataAccessService
{
    public class DataAccessGetClient : DataAccessRepository<clientList, Int32>
    {
        protected override void FillParameters(OperationType operation, clientList instance, List<DbParameter> parameters)
        {
            throw new NotImplementedException();
        }

        protected override string GetProcedureName(OperationType operation)
        {
            string spName = string.Empty;
            switch (operation)
            {
                case OperationType.GetAll:
                    spName = "USP_GetClientList";
                    break;
                default:
                    spName = string.Empty;
                    break;
            }
            return spName;
        }

        protected override clientList Parse(System.Data.DataRow data)
        {
            return new clientList
            {
                ClientId = data.Read<Int32>("ClientId"),
              ClientName = data.ReadString("ClientName")

            };
        }
    }

  public class DataAccessGetClientDetails : DataAccessRepository<clientDetailsList, Int32>
  {
    protected override void FillParameters(OperationType operation, clientDetailsList instance, List<DbParameter> parameters)
    {
      parameters.Add(DbHelper.CreateParameter("FromDate", instance.FromDate));
      parameters.Add(DbHelper.CreateParameter("ToDate", instance.ToDate));
      parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
    }

    protected override string GetProcedureName(OperationType operation)
    {
      string spName = string.Empty;
      switch (operation)
      {
        case OperationType.GetAll:
          spName = "USP_GetClientDetailsList";
          break;
        default:
          spName = string.Empty;
          break;
      }
      return spName;
    }

    protected override clientDetailsList Parse(System.Data.DataRow data)
    {
      return new clientDetailsList
      {
        ClientId = data.Read<Int32>("ClientId"),
        ClientRefId = data.Read<Int64>("ClientRefId"),
        ClientName = data.ReadString("ClientName"),
        ProjectName = data.ReadString("ProjectName"),
        AptaraContact = data.ReadString("AptaraContact"),
        ClientDate = data.Read<DateTime>("LastUpdatedOn")
      };
    }
  }



  public class DataAccessGetClientForTop : DataAccessRepository<clientList, Int32>
  {
    protected override void FillParameters(OperationType operation, clientList instance, List<DbParameter> parameters)
    {
      parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
    }

    protected override string GetProcedureName(OperationType operation)
    {
      string spName = string.Empty;
      switch (operation)
      {
        case OperationType.GetAll:
          spName = "USP_GetClient";
          break;
        default:
          spName = string.Empty;
          break;
      }
      return spName;
    }

    protected override clientList Parse(System.Data.DataRow data)
    {
      return new clientList
      {
        ClientId = data.Read<Int32>("ClientId"),

        ProjectName = data.ReadString("ProjectName"),
        AptaraContact = data.ReadString("AptaraContact"),
        AptaraContact2 = data.ReadString("AptaraContact2")

      };
    }
  }


  public class DataAccessGetClientFeedback : DataAccessRepository<clientFeedback, Int32>
  {
    protected override void FillParameters(OperationType operation, clientFeedback instance, List<DbParameter> parameters)
    {
      parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
    }

    protected override string GetProcedureName(OperationType operation)
    {
      string spName = string.Empty;
      switch (operation)
      {
        case OperationType.GetAll:
          spName = "USP_GetClientFeedback";
          break;
        default:
          spName = string.Empty;
          break;
      }
      return spName;
    }

    protected override clientFeedback Parse(System.Data.DataRow data)
    {
      return new clientFeedback
      {
        QuestionId = data.Read<Int32>("QuestionId"),
        SubmittedEvaluation = data.Read<Int32>("SubmittedEvaluation"),
        Remarks = data.ReadString("Remarks"),
        ReviewerEmail = data.ReadString("ReviewerEmail"),
        ReviewerName = data.ReadString("ReviewerName")
      };
    }
  }
}
