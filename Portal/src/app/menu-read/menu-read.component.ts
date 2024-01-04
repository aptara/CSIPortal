import { animate, state, style, transition, trigger } from '@angular/animations';

import * as jsPDF from 'jspdf';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { GetQuestionDetailService } from '../get-question-detail.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { MenuReadService } from './menu-read.service';
declare var bootbox: any;
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-menu-read',
  templateUrl: './menu-read.component.html',
  styleUrls: ['./menu-read.component.css']
})
export class MenuReadComponent {
  @ViewChild('myChart') myChart!: ElementRef;
  @ViewChild('radioButtonGroup') radioButtonGroup!: ElementRef;
  AddQuestionAnswer: FormGroup | any;
  i: any;
  hideHeaderOnPrint = false
  constructor(private service: GetQuestionDetailService,
    private menuservice: MenuReadService,
    private path: ActivatedRoute,
    private fb: FormBuilder,
    private renderer: Renderer2, private el: ElementRef,
    private router:Router
  ) { 
   
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
  private sub: any;

  resultData: any = [];
  selectedRadioValue: any;
  LinkGUID:any;
  ngOnInit() {
    this.accordianItems.forEach((item: { isOpen: boolean; }) => (item.isOpen = true));
    
    this.AddQuestionAnswer = this.fb.group({});
    this.sub = this.path.paramMap.subscribe(params => {
      debugger
      this.LinkGUID =params.get('LinkGUID');
      this.GetSubmittedData(this.LinkGUID);    
    });
  }


  // getEvaluationColor(selectedEvaluation: number): string {
  //   // Determine background color based on selected evaluation
  //   const threshold = 7; // Change this threshold as needed
  //   return selectedEvaluation <= threshold ? 'red' : 'green';
  // }
  maxEvaluation: number = 10;
  getNumbersArray(): number[] {
    return Array.from({ length: this.maxEvaluation + 1 }, (_, i) => i);
  }
  getEvaluationColor(submittedEvaluation: number, headerValue: number): string {
    if (headerValue > submittedEvaluation) {
      return 'white';
    } else if (submittedEvaluation <= 7) {
      return 'red';
    } else if (submittedEvaluation === 8) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
  
  
  
  

  toggleAccordion(item: any): void {
    item.isOpen = !item.isOpen;
  }

  isAccordionOpen(item: any): boolean {
    return item.isOpen === true
  }

  expandAll(): void {
    this.accordianItems.forEach((item: { isOpen: boolean; }) => (item.isOpen = true));
  }

  collapseAll(): void {
    this.accordianItems.forEach((item: { isOpen: boolean; }) => (item.isOpen = false));
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
 
  public isPrintMode: boolean = false;

printPreview(): void {
  this.isPrintMode = true;
  this.accordianItems.forEach((item: { isOpen: boolean; }) => (item.isOpen = true));
  setTimeout(() => {
    window.print();
    this.isPrintMode = false;
  });
}

  // printPreview(): void {
  //   const pdf = new (jsPDF as any)();
  //   const content = document.getElementById('your-content-id')!;
  
  //   pdf.fromHTML(content, 15, 15, { pagesplit: true }, function() {
  //     pdf.save('your-file-name.pdf');
  //   });
  // }
  
  GetSubmittedData(cId:number){

    this.menuservice.getClientFeedback(this.LinkGUID).subscribe({
        next: (data: any) => {
          this.resultData = data;
          console.log(this.resultData)
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
    window.location.href = './Dashboard';
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