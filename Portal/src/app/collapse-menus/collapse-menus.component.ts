import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { GetQuestionDetailService } from '../get-question-detail.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var bootbox: any;
@Component({
  selector: 'app-collapse-menus',
  templateUrl: './collapse-menus.component.html',
  styleUrls: ['./collapse-menus.component.css'],
// Ensure this closing bracket is in the correct position
})
export class CollapseMenusComponent {
  AddQuestionAnswer: FormGroup|any;

  constructor(private service:GetQuestionDetailService,
    private fb:FormBuilder){
      this.AddQuestionAnswer = new FormGroup({
        'ReviewerName': new FormControl(null,Validators.required),
        'ReviewerEmail': new FormControl(null,Validators.required),
        //Email: new FormControl(null,Validators.required),
        //Evaluation: new FormControl(null,Validators.required),
        //'Remark' : new FormControl(null,Validators.required)
       // 'Remark': this.fb.array([]),
      });
    }
 //accordianItems = [
   // { question: "1.Project Planning and Management  ", answer: "My name is Demo." },
   // { question: "2.Schedule Adherence ", answer: "I generate responses based on the input I receive." },
    // Add more items as needed
  //];
  GetAllDescription: any=[];
  Discription: any=[];
  accordianItems:any=[];
  question:any=[];
  accordionOpenStates: boolean[] = [];
  SelectedRanking:{}= {}
  SelectedRankingArray:any =[]
  QueComment:{}={}
  Remark:string=""
  ViewerName:string=""
  ViewerEmail:string=""
  isFormSubmitted = false;
  header :any;
  list:any
  ngOnInit(){
    this.GetQuestion()
    this.GetDescription()
    
 // Assuming you have a list of questions in `questionsList`



this.service.GetClient(2).subscribe(res => {
  this.header= res
 console.log(this.header.ProjectName) 
 this.header.Data.forEach((Element: any) => {
  console.log(Element.ProjectName)
  this.list=Element.ProjectName
 });
});

  }
  get GetBasicInfo(): FormArray {
    return this.AddQuestionAnswer.get('Remark') as FormArray;
  }

  selectedEvaluation: string | null = null;

  // Function to handle radio button selection
 // Define a class property to store the selected evaluations for each question
selectedRankings: any[] = [];

handleRadioButtonSelection(value: string, queId: string): void {

  // Check if the question is already in the selectedRankings array
  const existingIndex = this.selectedRankings.findIndex(item => item.QuestionId === queId);

  if (existingIndex !== -1) {
    // If the question is already in the array, update the selected evaluation
    this.selectedRankings[existingIndex].SubmittedEvaluation = value;
  } else {
    // If the question is not in the array, add a new object to the array
    this.selectedRankings.push({
      QuestionId: queId,
      SubmittedEvaluation: value
    });
  }

 
 
}
  GetDescription() {
    this.service.getAllDetail().subscribe(res => {
      this.Discription = res;
  
      this.accordianItems = this.Discription.Data.map((element: any) => {
        return { question: element.Question, description: element.QuestionDescription ,Evaluation:element.Evaluation 
          ,Evaluation1:element.Evaluation1
          ,Evaluation2:element.Evaluation2
          ,Evaluation3:element.Evaluation3
          ,Evaluation4:element.Evaluation4
          ,Evaluation5:element.Evaluation5
          ,Evaluation6:element.Evaluation6
          ,Evaluation7:element.Evaluation7
          ,Evaluation8:element.Evaluation8
          ,Evaluation9:element.Evaluation9
          ,Evaluation10:element.Evaluation10
          ,QuestionSerialNumber:element.QuestionSerialNumber
        };
      });
    });
  }
    
GetQuestion(){
  this.service.getAllDetail().subscribe(res => {
     this.question = res;
    // console.log(this.question)

   // this.accordianItems.push(this.question.Question)
   
    this.question.Data.forEach((element:any) => {
      console.log(element.Question)
      this.accordianItems.push(element.Question)
    });
   // console.log(this.question.Data[0].Question);

  
  });
}
  






getRemark(txt:string, queId:number){
  this.Remark = txt
  const existingIndex = this.selectedRankings.findIndex(item => item.QuestionId === queId);
  if (existingIndex !== -1) {
    // If the question is already in the array, update the selected evaluation
    this.selectedRankings[existingIndex].Remarks = this.Remark;
  } else {
    // If the question is not in the array, add a new object to the array
    this.selectedRankings.push({
      QuestionId: queId,
      Remarks: this.Remark
    });
}
return this.GetBasicInfo.controls[queId].value;

}


// onsubmit(){
//   this.isFormSubmitted = true;
//   console.log(this.AddQuestionAnswer)
//  console.log(this.selectedRankings)
//   this.selectedRankings.forEach(element=>{
//    element.ClientId = "2"
//    element.CorrectEvaluation ="10"
//    element.ReviewerName= this.ViewerName
//    element.ReviewerEmail = this.ViewerEmail
//     console.log(element)
   
//   })
// if(this.selectedRankings)
//   this.service.PostAllDetail(this.selectedRankings).subscribe(res=>{
//     if(res!==null){
//      // this.selectedRankings = [];
     
//       alert("submitted")
     
//     }
//   })

//   else{
//     alert("not submitted")
//   }
//  }

// onsubmit() {
//   // Check if any required field is empty
//   const emptyFields = this.selectedRankings.filter(element => {
//     return (
//       !element.Question ||
//       !element.Remark ||
//       !element.Evaluation ||
//       !element.ReviewerName ||
//       !element.ReviewerEmail
//     );
//   });

//   if (emptyFields.length > 0) {
//     console.log('Empty fields:', emptyFields);
//     alert('Please fill in all required fields.');
//     return;
//   }

//   // If all fields are filled, proceed with data preparation and submission
//   this.selectedRankings.forEach(element => {
//     element.ClientId = '2';
//     element.CorrectEvaluation = '10';
//     element.ReviewerName = this.ViewerName;
//     element.ReviewerEmail = this.ViewerEmail;
//     console.log(element);
//   });

//   this.service.PostAllDetail(this.selectedRankings).subscribe(res => {
//     if (res !== null) {
//       alert('Submitted');
//     }
//   });
// }

onsubmit() {
  this.isFormSubmitted = true;

  // Check if the form is valid
  if (this.AddQuestionAnswer.valid) {
    const accordianItemCount = this.accordianItems.length;
    const selectedRankingsCount = this.selectedRankings.length;

    // Check if the counts match
    if (accordianItemCount === selectedRankingsCount) {
      this.selectedRankings.forEach(element => {
        element.ClientId = "2";
        element.CorrectEvaluation = "10";
        element.ReviewerName = this.ViewerName;
        element.ReviewerEmail = this.ViewerEmail;
        console.log(element);
      });

      this.service.PostAllDetail(this.selectedRankings).subscribe(res => {
        if (res !== null) {
          alert("Submitted");
        } else {
          alert("Not submitted");
        }
      });
    } else {
      alert("Question counts do not match. Please answer all questions.");
    }
  } else {
    alert("Please enter Reviewer Name and Email.");
  }
}


 getName(txt: string) {
  this.ViewerName = txt;
 // this.SelectedRankings();
}

getEmail(txt: string) {
  this.ViewerEmail = txt;
  //this.SelectedRankings();
}

// private SelectedRankings() {
//   if (this.ViewerName && this.ViewerEmail) {
//     this.selectedRankings.push({
//       ReviewerName: this.ViewerName,
//       ReviewerEmail: this.ViewerEmail,
//       ClientId: '2',
//       CorrectEvaluation: '10',
//     });

//     // Reset the values after pushing
//     this.ViewerName = '';
//     this.ViewerEmail = '';
//   }
// }
}


// {
//   "CreatedBy": 1,
//   "ClientId": 2,
//   "QuestionId": 2,
//   "Remarks": "ok",
//   "CorrectEvaluation": 8,
//   "SubmittedEvaluation": 8,
//   "IsActive": 1
// }