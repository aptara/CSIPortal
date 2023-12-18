import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GetQuestionDetailService } from '../get-question-detail.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuReadService } from '../menu-read/menu-read.service';
import { LocalStorageService } from '../localstorageService';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  @ViewChild('radioButtonGroup') radioButtonGroup!: ElementRef;
  AddQuestionAnswer: FormGroup | any;
  constructor(private service: GetQuestionDetailService,
    private menuservice: MenuReadService,
    private path: ActivatedRoute,
    private fb: FormBuilder
    ,private LocalStorageService : LocalStorageService
  ) { }
  //accordianItems = [
  // { question: "1.Project Planning and Management  ", answer: "My name is Demo." },
  // { question: "2.Schedule Adherence ", answer: "I generate responses based on the input I receive." },
  // Add more items as needed
  //];
  submittedData: any[]=[];
  GetAllDescription: any = [];
  Discription: any = [];
  accordianItems: any = [];
  question: any = [];
  accordionOpenStates: boolean[] = [];
  SelectedRanking: {} = {}
  SelectedRankingArray: any = []
  QueComment: {} = {}
  Remark: string = ""
  private sub: any;
  clientId: any
  resultData: any = [];
  selectedRadioValue: any;
  LinkGUID:any
  header:any=[]
  ngOnInit() {
    this.AddQuestionAnswer = this.fb.group({});
    this.sub = this.path.paramMap.subscribe(params => {
      debugger
      this.LinkGUID = params.get('LinkGUID');
    });
    this.service.GetClient(this.LinkGUID).subscribe(res => {
      this.header = res
    });
    // // Use ActivatedRoute to get the submittedData
    // this.path.data.subscribe(data => {
    //   this.submittedData = data['submittedData'] || [];
    //   console.log(this.submittedData);
    // });
    this.submittedData = this.LocalStorageService.get('submittedData');
    console.log(this.submittedData)
    
  // this.GetDescription()
    this.GetSubmittedData();
   // this.OnSubmitFromPreview()
  }
  
  
  
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

    console.log('Selected Evaluations:', this.selectedRankings);

  }
  Pquestion:any

  // GetDescription() {
  //   this.service.getAllDetail().subscribe(res => {
  //     this.Discription = res;

  //     this.accordianItems = this.Discription.Data.map((element: any) => {
  //       return {
  //         question: element.Question, description: element.QuestionDescription, Evaluation: element.Evaluation
  //         , Evaluation1: element.Evaluation1
  //         , Evaluation2: element.Evaluation2
  //         , Evaluation3: element.Evaluation3
  //         , Evaluation4: element.Evaluation4
  //         , Evaluation5: element.Evaluation5
  //         , Evaluation6: element.Evaluation6
  //         , Evaluation7: element.Evaluation7
  //         , Evaluation8: element.Evaluation8
  //         , Evaluation9: element.Evaluation9
  //         , Evaluation10: element.Evaluation10
  //         , QuestionSerialNumber: element.QuestionSerialNumber
  //       };
  //     });
  //   });
  // }

  // GetSubmittedData(){

  // //  this.menuservice.getClientFeedback(this.LinkGUID).subscribe({
  //      // next: (data: any) => {
  //         //this.resultData = data;
  //        // console.log(this.resultData)
  //      //  this.accordianItems.push(this.submittedData)
  //         this.accordianItems = this.submittedData.map((element: any) => {
  //           return {
  //             question: element.Question, description: element.QuestionDescription, Evaluation: element.Evaluation
  //             // , Evaluation1: element.Evaluation1
  //             // , Evaluation2: element.Evaluation2
  //             // , Evaluation3: element.Evaluation3
  //             // , Evaluation4: element.Evaluation4
  //             // , Evaluation5: element.Evaluation5
  //             // , Evaluation6: element.Evaluation6
  //             // , Evaluation7: element.Evaluation7
  //             // , Evaluation8: element.Evaluation8
  //             // , Evaluation9: element.Evaluation9
  //             // , Evaluation10: element.Evaluation10
  //             , QuestionSerialNumber: element.QuestionId
  //             ,Remarks:element.Remarks
  //             ,SubmittedEvaluation:element.SubmittedEvaluation
  //           };
  //         });
  //      // }
  //    // })
  // }

  GetSubmittedData() {
   // this.menuservice.getClientFeedback(this.LinkGUID).subscribe({
      //next: (data: any) => {
        // Assuming submittedData is an array property of your class
        this.service.getAllDetail().subscribe(res => {
          this.Discription = res;
    
          this.accordianItems = this.Discription.Data.map((element: any) => {
            const submittedItem = this.submittedData.find((submittedElement: any) => 
            submittedElement.QuestionId === element.QuestionSerialNumber);
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
              , QuestionSerialNumber: element.QuestionSerialNumber,
              Remarks: submittedItem ? submittedItem.Remarks : '',
              ReviewerName: submittedItem ? submittedItem.ReviewerName : '',
              ReviewerEmail: submittedItem ? submittedItem.ReviewerEmail : '',
              ClientId: submittedItem ? submittedItem.ClientId :'' ,
              ProjectID: submittedItem ? submittedItem.ProjectID :'' ,
             LinkGUID: submittedItem ? submittedItem.LinkGUID :'' ,
             QuestionId: submittedItem ? submittedItem.QuestionId             :'' ,
              SubmittedEvaluation: submittedItem ? submittedItem.SubmittedEvaluation : ''
            };
          });
        });
  
        // Assuming accordianItems is already initialized in your class
       // this.accordianItems = this.Discription.Data.map((element: any) => {
        
  
          // return {
          //   question: element.Question,
          //   description: element.QuestionDescription,
          //   Evaluation: element.Evaluation,
          //   QuestionSerialNumber: element.QuestionSerialNumber,
     
          // };
        //});
    //  }
   // });
  }
  
  OnSubmitFromPreview() {
    this.submittedData = this.LocalStorageService.get('submittedData');
  
    if (this.submittedData && this.submittedData.length > 0) {
      this.service.PostAllDetail(this.accordianItems).subscribe(res => {
        if (res !== null) {
          console.log(res);
          window.location.href = './ThankYou';
          // Handle the response as needed
          // ...
        }
      });
    } else {
      console.error("Submitted data is null or empty");
      // Handle the case where submittedData is null or empty
    }
  }
  
  // navigateBack(){
  //   window.location.href = './Dashboard';
  // }
}
