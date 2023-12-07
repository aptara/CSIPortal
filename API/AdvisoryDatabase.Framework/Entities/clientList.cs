using AdvisoryDatabase.Framework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Framework.Entities
{

    public class clientList : BaseEntity<Int32>
    {
      public int ClientId { get; set; }
      public string ClientName { get; set; }
      public string ProjectName { get; set; }
      public string AptaraContact { get; set; }
      public string AptaraContact2 { get; set; }
      public Boolean IsSurveySubmitted { get; set; }
    }
    public class clientDetailsList : BaseEntity<Int32>
    {
        public int ClientId { get; set; }
        public long ClientRefId { get; set; }
        public string ClientName { get; set; }
        public string ProjectName { get; set; }
        public string AptaraContact { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Question { get; set; }
        public string ClientDate { get; set; }

    }

    public class clientFeedback : BaseEntity<Int32>
  {
    public int ClientId { get; set; }
    public int QuestionId { get; set; }
    public int SubmittedEvaluation { get; set; }
    public string Remarks { get; set; }
    public string ReviewerEmail { get; set; }
    public string ReviewerName { get; set; }
  }
}

