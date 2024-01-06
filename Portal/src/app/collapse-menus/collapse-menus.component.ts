import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { GetQuestionDetailService } from '../get-question-detail.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '../localstorageService';
declare var bootbox: any;
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';
import { MenuReadService } from '../menu-read/menu-read.service';

@Component({
  selector: 'app-collapse-menus',
  templateUrl: './collapse-menus.component.html',
  styleUrls: ['./collapse-menus.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class CollapseMenusComponent {
  AddQuestionAnswer: FormGroup | any;


  // isAllAccordionsOpen = true;

  // toggleAccordion(index: number): void {
  //   this.isAllAccordionsOpen = false;
  //   // Your existing toggle logic here
  // }

  // isAccordionOpen(index: number): boolean {
  //   return this.isAllAccordionsOpen 
  // }

  // toggleAllAccordions(): void {
  //   this.isAllAccordionsOpen = !this.isAllAccordionsOpen;
  // }
  isAccordionItemOpen: boolean[] = [];
  constructor(private service: GetQuestionDetailService,
    private fb: FormBuilder,
    private path: ActivatedRoute,
    private messageService: MessageService
    , private router: Router
    , private LocalStorageService: LocalStorageService,
    private dialogService: DialogService,
    private MenuReadService: MenuReadService
  ) {
    this.AddQuestionAnswer = new FormGroup({
      'ReviewerName': new FormControl(null, Validators.required),
      'ReviewerEmail': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")]),

    });
    //this.accordianItems.forEach(() => this.isAccordionItemOpen.push(true));
  }
  toggleAccordion(item: any): void {
    item.isOpen = !item.isOpen;
  }

  isAccordionOpen(item: any): boolean {
    return item.isOpen;
  }

  expandAll(): void {
    this.accordianItems.forEach((item: { isOpen: boolean; }) => (item.isOpen = true));
  }

  collapseAll(): void {
    this.accordianItems.forEach((item: { isOpen: boolean; }) => (item.isOpen = false));
  }
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
  InValidRequest: any
  resultData: any = [];
  ngOnInit() {
    this.GetQuestion()
    this.GetDescription()
    this.accordianItems.forEach(() => this.isAccordionItemOpen.push(true));
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
        else if (Element.InValidRequest === '0') {
          console.log(Element.InValidRequest)
          window.location.href = '/BadResponse';
        }
        else {
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
  
  }


  selectedEvaluation: string | null = null;

  // Function to handle radio button selection
  // Define a class property to store the selected evaluations for each question
  selectedRankings: any[] = [];
  SubmittedEvaluation:any
  handleRadioButtonSelection(value: string, queId: string): void {

    // Check if the question is already in the selectedRankings array
    const existingIndex = this.selectedRankings.findIndex(item => item.QuestionId === queId);

    if (existingIndex !== -1) {
      // If the question is already in the array, update the selected evaluation
      this.selectedRankings[existingIndex].SubmittedEvaluation = value;
    } else {
      this.SubmittedEvaluation = value
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
      this.question.Data.forEach((element: any) => {
        console.log(element.Question)
        this.accordianItems.push(element.Question)
      });
    });
  }


  getRemark(txt: string, queId: number) {
    this.Remark = txt
    const existingIndex = this.selectedRankings.findIndex(item => item.QuestionId === queId);
    if (existingIndex !== -1) {
      // If the question is already in the array, update the selected evaluation
      this.selectedRankings[existingIndex].Remarks = this.Remark;
     // this.remarkRequired = this.SubmittedEvaluation <= 8 && (!txt || txt.trim().length === 0);
    } else {
      // If the question is not in the array, add a new object to the array
      this.selectedRankings.push({
        QuestionId: queId,
        Remarks: this.Remark,
        Question: this.question
      });
    }

    
  }

  
  remarkRequired:any
  onSubmit() {
    this.isFormSubmitted = true;
  
    // Check if the form is valid
    const accordianItemCount = this.accordianItems.length;
    const selectedRankingsCount = this.selectedRankings.length;
  
    // Check if the counts match
    if (accordianItemCount === selectedRankingsCount) {
      let isInvalid = false;
  
      this.selectedRankings.forEach(element => {
        element.ClientId = this.ClientId;
        element.CorrectEvaluation = "10";
        element.ReviewerName = this.ViewerName;
        element.ReviewerEmail = this.ViewerEmail;
        element.LinkGUID = this.LinkGUID;
        element.ProjectID = this.ProjectId;
        element.CreatedBy = this.ClientId;
        element.LastUpdatedBy = this.ClientId;
      
        console.log(element);
      });
  
   
  
      this.service.PostAllDetail(this.selectedRankings).subscribe(res => {
        if (res !== null) {
        
          // Navigate to '/ThankYou/' using Angular Router instead of window.location.href
          this.router.navigate(['/ThankYou/']);
        }
      });
    } else {
      this.showWarningDialog();
    }
  }
  
  submittedData: any[] = []
  // onSubmit() {
  //  // this.isFormSubmitted = false;

  //   const accordianItemCount = this.accordianItems.length;
  //   const selectedRankingsCount = this.selectedRankings.length;

  //   // Check if the counts match
  //    if (accordianItemCount === selectedRankingsCount) {
  //   this.selectedRankings.forEach(element => {
  //     element.ClientId = this.ClientId;
  //     element.CorrectEvaluation = "10";
  //     element.ReviewerName = this.ViewerName;
  //     element.ReviewerEmail = this.ViewerEmail;
  //     element.LinkGUID = this.LinkGUID;
  //     element.ProjectID = this.ProjectId;
  //     element.question = this.question

  //     console.log(element);
  //   });


  //   console.log(this.selectedEvaluation)
  //    this.submittedData = this.selectedRankings;
  //    this.LocalStorageService.submittedData = this.submittedData; 
  //   this.LocalStorageService.set('submittedData', this.submittedData);

  //   this.router.navigate(['/Preview/', this.LinkGUID]);
  //    } 
  //    else {
  //     this.showWarningDialog()
  //   }

  // }

  private showWarningDialog(): void {
    const ref = this.dialogService.open(DialogeComponent, {
      header: 'Warning',
    
      data: {
        message: 'All mandatory questions must be answered for the Questionnaire to be marked as completed..',
      },
    });

    ref.onClose.subscribe(() => {
      // Handle dialog closed event if needed
    });
  }


  private showSuccessDialog(): void {
    const ref = this.dialogService.open(DialogeComponent, {
      header: 'Information',
     
      data: {
        message: 'Thank you so much for your time in completing our survey. We appreciate your answers to this survey.',
      },
    });

    ref.onClose.subscribe(() => {
      // Handle dialog closed event if needed
    });
  }
  getName(txt: string) {
    this.ViewerName = txt;

  }

  getEmail(txt: string) {
    this.ViewerEmail = txt;

  }
  display: boolean = false;
  OpenModal(){
    // this.selectedRankings.forEach(element => {
      

    //   // Check if evaluation is below 8 and remark is not provided
    //   if (element.SubmittedEvaluation <= '8' && (!element.Remark || element.Remark.trim().length === 0)) {
     
    //     console.log(element.submittedEvaluation)
    //     return; 
    //   }
    // });

    const accordianItemCount = this.accordianItems.length;
    const selectedRankingsCount = this.selectedRankings.length;

    // Check if the counts match
    if (accordianItemCount === selectedRankingsCount) {
    this.display = true;
    }
    else {
      this.showWarningDialog();
    }
  }

  maxEvaluation: number = 10;
  getNumbersArray(): number[] {
    return Array.from({ length: this.maxEvaluation + 1 }, (_, i) => i);
  }
  getEvaluationColor(submittedEvaluation: number, headerValue: number): string {
    if (headerValue > submittedEvaluation) {
      return 'white';
    } else if (submittedEvaluation <= 7) {
      return 'red';
    } else if (submittedEvaluation === 1) {
      return 'gray';
    } else if (submittedEvaluation == 8) {
      return 'yellow';
    } else {
      return 'green';
    }
  }


  ClosePopUp(){
    this.display=false
  }
}


