import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { GetQuestionDetailService } from '../get-question-detail.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

declare var bootbox: any;
@Component({
  selector: 'app-collapse-menus',
  templateUrl: './collapse-menus.component.html',
  styleUrls: ['./collapse-menus.component.css'],
  
})
export class CollapseMenusComponent {
  AddQuestionAnswer: FormGroup | any;


  openAccordionIndex = 0;

  toggleAccordion(index: number): void {
    this.openAccordionIndex = (this.openAccordionIndex === index) ? -1 : index;
  }

  isAccordionOpen(index: number): boolean {
    return this.openAccordionIndex === index;
  }

  constructor(private service: GetQuestionDetailService,
    private fb: FormBuilder,
    private path: ActivatedRoute,
    private messageService: MessageService) {
    this.AddQuestionAnswer = new FormGroup({
      'ReviewerName': new FormControl(null, Validators.required),
      'ReviewerEmail': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")]),
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
  GetAllDescription: any = [];
  Discription: any = [];
  accordianItems: any = [];
  question: any = [];
  accordionOpenStates: boolean[] = [];
  SelectedRanking: {} = {}
  SelectedRankingArray: any = []
  QueComment: {} = {}
  Remark: string = ""
  ViewerName: string = ""
  ViewerEmail: string = ""
  isFormSubmitted = false;
  header: any = [];
  list: any
  ClientId: any
  LinkGUID: any;
  ProjectId: any;
  InValidRequest:any
  ngOnInit() {
    this.GetQuestion()
    this.GetDescription()

    // Assuming you have a list of questions in `questionsList`
    let sub = this.path.paramMap.subscribe(params => {
      this.LinkGUID = 0;
      this.LinkGUID = params.get('LinkGUID');
    });


    this.service.GetClient(this.LinkGUID).subscribe(res => {
      this.header = res
      console.log(this.header)
      this.header.Data.forEach((Element: any) => {
          if (Element.IsSurveySubmitted === 'Yes') {
            window.location.href = '/SubmittedResponse';
          } 
          else if (Element.InValidRequest === '0')
           {
            console.log(Element.InValidRequest)
            window.location.href = '/BadResponse';
          }
          else{
            console.log(Element.ProjectName)
            console.log(Element.ProjectID)
            this.ProjectId = Element.ProjectID
            this.ClientId = Element.ClientId
            this.InValidRequest = Element.InValidRequest
            this.ViewerName = Element.ReviewerName;
            this.ViewerEmail = Element.ReviewerEmail;
          }
   
        this.list = Element.ProjectName
      });
    });
console.log(this.ViewerName,this.ViewerEmail)
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
        return {
          question: element.Question, description: element.QuestionDescription, Evaluation: element.Evaluation
          , Evaluation1: element.Evaluation1
          , Evaluation2: element.Evaluation2
          , Evaluation3: element.Evaluation3
          , Evaluation4: element.Evaluation4
          , Evaluation5: element.Evaluation5
          , Evaluation6: element.Evaluation6
          , Evaluation7: element.Evaluation7
          , Evaluation8: element.Evaluation8
          , Evaluation9: element.Evaluation9
          , Evaluation10: element.Evaluation10
          , QuestionSerialNumber: element.QuestionSerialNumber
        };
      });
    });
  }

  GetQuestion() {
    this.service.getAllDetail().subscribe(res => {
      this.question = res;
      // console.log(this.question)

      // this.accordianItems.push(this.question.Question)

      this.question.Data.forEach((element: any) => {
        console.log(element.Question)
        this.accordianItems.push(element.Question)
      });
      // console.log(this.question.Data[0].Question);


    });
  }







  getRemark(txt: string, queId: number) {
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

  onSubmit() {
    this.isFormSubmitted = true;
  
    // Check if the form is valid
     
      const accordianItemCount = this.accordianItems.length;
      const selectedRankingsCount = this.selectedRankings.length;
  
      // Check if the counts match
      if (accordianItemCount === selectedRankingsCount) {
        this.selectedRankings.forEach(element => {
          element.ClientId = this.ClientId;
          element.CorrectEvaluation = "10";
          element.ReviewerName = this.ViewerName;
          element.ReviewerEmail = this.ViewerEmail;
          element.LinkGUID = this.LinkGUID;
          element.ProjectID = this.ProjectId;
  
          console.log(element);
        });
  
        this.service.PostAllDetail(this.selectedRankings).subscribe(res => {
          if (res !== null) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Submitted' });
         
            // Navigate to '/ThankYou/' using Angular Router instead of window.location.href
            // this.router.navigate(['/ThankYou/']);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not submitted' });
          }
        });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Question counts do not match. Please answer all questions.' });
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

}


