using AdvisoryDatabase.Framework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvisoryDatabase.Framework.Entities
{
 public class GetQuestion : BaseEntity<Int32>
  {
    public int QuestionId { get; set; }
    public Int64 QuestionSerialNumber { get; set; }
    public string Question { get; set; }
    public string QuestionDescription { get; set; }
    public string CorrectAnswer { get; set; }
    public int Evaluation1 { get; set; }
    public int Evaluation2 { get; set; }
    public int Evaluation3 { get; set; }
    public int Evaluation4 { get; set; }
    public int Evaluation5 { get; set; }
    public int Evaluation6 { get; set; }
    public int Evaluation7 { get; set; }
    public int Evaluation8 { get; set; }
    public int Evaluation9 { get; set; }
    public int Evaluation10 { get; set; }
    public string Evaluation { get; set; }
    /* public bool IsActive { get; set; }*/
    // public List<GetQuestionList> GetQuestionList { get; set; }

    public int ClientId { get; set; }
 
    public string Remarks { get; set; }
    public int CorrectEvaluation { get; set; }
    public int SubmittedEvaluation { get; set; }
    public string ReviewerName { get; set; }
    public string ReviewerEmail { get; set; }

    public string LinkGUID { get; set; }
    public long ProjectID { get; set; }
    public string PostQuestionXML { get; set; }

  }



  public class GetClient
  {
    public int ClientId { get; set; }
    public Int64 QuestionSerialNumber { get; set; }
    public string Question { get; set; }
    public string QuestionDescription { get; set; }
    public string CorrectAnswer { get; set; }
  }
   
}
