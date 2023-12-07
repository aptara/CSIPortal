import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GetQuestionDetailService } from '../get-question-detail.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuReadService } from './menu-read.service';
declare var bootbox: any;
@Component({
  selector: 'app-menu-read',
  templateUrl: './menu-read.component.html',
  styleUrls: ['./menu-read.component.css']
})
export class MenuReadComponent {
  @ViewChild('radioButtonGroup') radioButtonGroup!: ElementRef;
  AddQuestionAnswer: FormGroup | any;
  constructor(private service: GetQuestionDetailService,
    private menuservice: MenuReadService,
    private path: ActivatedRoute,
    private fb: FormBuilder
  ) { }
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
  private sub: any;
  clientId: any
  resultData: any = [];
  selectedRadioValue: any;
  ngOnInit() {
    this.AddQuestionAnswer = this.fb.group({});
    this.sub = this.path.paramMap.subscribe(params => {
      this.clientId = (params.get('id'));
      this.GetSubmittedData(this.clientId);    
    });
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
  //         ,Remarks:element.Remarks
  //         ,SubmittedEvaluation:element.SubmittedEvaluation
  //       };
  //     });
  //   });
  // }

  // GetQuestion() {
  //   this.service.getAllDetail().subscribe(res => {
  //     this.question = res;
  //     console.log(this.question)

  //     // this.accordianItems.push(this.question.Question)

  //     this.question.Data.forEach((element: any) => {
  //       console.log(element.Question)
  //       this.accordianItems.push(element.Question)
  //     });
  //     console.log(this.question.Data[0].Question);


  //   });
  // }

  // getRemark(txt: string, queId: number) {

  //   this.Remark = txt
  //   const existingIndex = this.selectedRankings.findIndex(item => item.QuestionId === queId);
  //   if (existingIndex !== -1) {
  //     // If the question is already in the array, update the selected evaluation
  //     this.selectedRankings[existingIndex].Remarks = this.Remark;
  //   } else {
  //     // If the question is not in the array, add a new object to the array
  //     this.selectedRankings.push({
  //       QuestionId: queId,
  //       Remarks: this.Remark
  //     });
  //   }
  // }

  GetSubmittedData(cId:number){

    this.menuservice.getClientFeedback(this.clientId).subscribe({
        next: (data: any) => {
          this.resultData = data;
          this.accordianItems = this.resultData.Data.map((element: any) => {
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
              ,Remarks:element.Remarks
              ,SubmittedEvaluation:element.SubmittedEvaluation
            };
          });
        }
      })
  }

  navigateBack(){
    window.location.href = './clientDashboard';
  }
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