using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdvisoryDatabase.DataAccess.Common;
using AdvisoryDatabase.DataAccess.Repository;
using AdvisoryDatabase.Framework.Entities;
using System.Data;
using System.Data.Common;

namespace AdvisoryDatabase.DataAccess.DataAccessService
{
  public class DataAccessGetQuestion : DataAccessRepository<GetQuestion, Int32>
  {
    protected override void FillParameters(OperationType operation, GetQuestion instance, List<DbParameter> parameters)
    {
      switch (operation)
      {
        case OperationType.Add:
        /*  parameters.Add(DbHelper.CreateParameter("ClientId", instance.ClientId));
          parameters.Add(DbHelper.CreateParameter("Remarks", instance.Remarks));
          parameters.Add(DbHelper.CreateParameter("CorrectEvaluation", instance.CorrectEvaluation));
          parameters.Add(DbHelper.CreateParameter("SubmittedEvaluation", instance.SubmittedEvaluation));
          parameters.Add(DbHelper.CreateParameter("QuestionId", instance.QuestionId));*/
          
          parameters.Add(DbHelper.CreateParameter("PostQuestionXML", instance.PostQuestionXML));

          break;
      }
    }

    protected override string GetProcedureName(OperationType operation)
    {
      string spName = string.Empty;
      switch (operation)
      {
        case OperationType.GetAll:
          spName = "USP_QuestionDetail";
          break;
        case OperationType.Add:
          spName = "USP_PostQuestionDetail";
          break;
        default:
          spName = string.Empty;
          break;
      }
      return spName;
    }

    protected override GetQuestion Parse(System.Data.DataRow data)
    {
      return new GetQuestion
      {
        QuestionId = data.Read<Int32>("QuestionId"),
       QuestionSerialNumber = data.Read<Int32>("QuestionSerialNumber"),
        Question = data.ReadString("Question"),

        QuestionDescription = data.ReadString("QuestionDescription"),
        CorrectAnswer = data.ReadString("CorrectAnswer"),


      };
    }

        protected override List<GetQuestion> ParseGetAllData(System.Data.DataSet data)
        {
            List<GetQuestion> courses = new List<GetQuestion>();
            GetQuestion course = new GetQuestion();

            var GetAllData = data.Tables[0].AsEnumerable().Select(row =>
                new GetQuestion
                {
                    QuestionId = row.Read<int>("QuestionId"),
                  
              QuestionSerialNumber = row.Read<Int32>("QuestionSerialNumber"),
                  Question = row.ReadString("Question"),

                 QuestionDescription = row.ReadString("QuestionDescription"),
                  CorrectAnswer = row.ReadString("CorrectAnswer"),
                  Evaluation1 = row.Read<int>("Evaluation1"),
                  Evaluation2 = row.Read<int>("Evaluation2"),
                  Evaluation3 = row.Read<int>("Evaluation3"),
                  Evaluation4 = row.Read<int>("Evaluation4"),
                  Evaluation5 = row.Read<int>("Evaluation5"),
                  Evaluation6 = row.Read<int>("Evaluation6"),
                  Evaluation7 = row.Read<int>("Evaluation7"),
                  Evaluation8 = row.Read<int>("Evaluation8"),
                  Evaluation9 = row.Read<int>("Evaluation9"),
                  Evaluation10 = row.Read<int>("Evaluation10"),
                  Evaluation = row.ReadString("Evaluation")


                }).ToList();
            if (GetAllData.Count == 1)
            {
                course = GetAllData.SingleOrDefault();
            }
          
            if (GetAllData.Count == 1)
            {
                courses.Add(course);
                return courses;
            }
            else
            {
                return GetAllData;
            }
        }


    //    protected override List<GetQuestion> ParseGetAllData(System.Data.DataSet data)
    //{
    //  var GetAllData = data.Tables[0].AsEnumerable().Select(row =>
    //           new GetQuestion
    //           {
    //             QuestionId = row.Read<Int32>("QuestionId"),

    //           }).ToList();

    //  return GetAllData;
  
    
    //}
  }




/*  public class DataAccessPostQuestion : DataAccessRepository<PostQuestion, Int32>
  {
    protected override void FillParameters(OperationType operation, PostQuestion instance, List<DbParameter> parameters)
    {
      throw new NotImplementedException();
    }

    protected override string GetProcedureName(OperationType operation)
    {
      string spName = string.Empty;
      switch (operation)
      {
        case OperationType.GetAll:
          spName = "USP_QuestionDetail";
          break;
        default:
          spName = string.Empty;
          break;
      }
      return spName;
    }

    protected override PostQuestion Parse(System.Data.DataRow data)
    {
      return new PostQuestion
      {
        
        *//* Evaluation1 = data.Read<Int32>("Evaluation1"),
         Evaluation2 = data.Read<Int32>("Evaluation2"),
         Evaluation3 = data.Read<Int32>("Evaluation3"),
         Evaluation4 = data.Read<Int32>("Evaluation4"),
         Evaluation5 = data.Read<Int32>("Evaluation5")*/
        /*  Evaluation6 = data.Read<int>("Evaluation6"),
          Evaluation7 = data.Read<int>("Evaluation7"),
          Evaluation8 = data.Read<int>("Evaluation8"),
          Evaluation9 = data.Read<int>("Evaluation9"),
          Evaluation10 = data.Read<int>("Evaluation10"),
          Evaluation = data.Read<int>("Evaluation")*//*

      };
    }

    protected override List<PostQuestion> ParseGetAllData(System.Data.DataSet data)
    {
      List<PostQuestion> courses = new List<PostQuestion>();
      PostQuestion course = new PostQuestion();

      var GetAllData = data.Tables[0].AsEnumerable().Select(row =>
          new PostQuestion
          {
           


          }).ToList();
      if (GetAllData.Count == 1)
      {
        course = GetAllData.SingleOrDefault();
      }

      if (GetAllData.Count == 1)
      {
        courses.Add(course);
        return courses;
      }
      else
      {
        return GetAllData;
      }
    }


    //    protected override List<GetQuestion> ParseGetAllData(System.Data.DataSet data)
    //{
    //  var GetAllData = data.Tables[0].AsEnumerable().Select(row =>
    //           new GetQuestion
    //           {
    //             QuestionId = row.Read<Int32>("QuestionId"),

    //           }).ToList();

    //  return GetAllData;


    //}
  }*/
}
