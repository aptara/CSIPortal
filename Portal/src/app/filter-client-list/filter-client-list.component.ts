// import { Component, ViewChild } from '@angular/core';
import { FilterClientListService } from './filter-client-list.service';
import { Component, ElementRef, Input, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import { NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-filter-client-list',
  templateUrl: './filter-client-list.component.html',
  styleUrls: ['./filter-client-list.component.css']
})
export class FilterClientListComponent {
  //@ViewChild('dt') table: Table;
  linkModalData: FormGroup | any;
  sortField: any;
  sortOrder: any;


  constructor(private service:FilterClientListService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private zone: NgZone, private cdr: ChangeDetectorRef){
    this.linkModalData =  this.fb.group({
      ClientId:[this.ClientForLink],
      ProjectId:[this.projectId],
      Clientemail: ['', [Validators.required, this.multipleEmailsValidator]],
      ClientName: [''],
      ProjectName: [''],
      ReviewerName:[''],
      ReviewerEmail:['',[Validators.required ,this.multipleEmailsValidator]],
      Remark : [''],
      CreatedBy:[''],
      LastUpdatedBy:['']
    });
    

  }


  GetLocalStorageData(){
    this.storedFirstName = localStorage.getItem('loginDetails');
    if (this.storedFirstName !== null) {
      this.FirstName = JSON.parse(this.storedFirstName);
     // console.log(this.FirstName[0].FirstName);
      this.RoleId = this.FirstName[0].RoleId;
      this.Role = this.FirstName[0].Role;
      this.UserMasterID = this.FirstName[0].UserMasterID
      console.log(this.Role,this.RoleId,this.UserMasterID)
    }
  }


  exportData(): void {
    if (this.resultList && this.resultList.length > 0) {
      // Extracting selected columns from the data
      const selectedColumns = this.resultList.map((item: { ClientName: any; ProjectName: any; AptaraContactName: any; AptaraContact: any; SurveyCreatedOn: any; ClientDate: any; IsSurveySubmitted: any; }) => ({
        ClientName: item.ClientName,
        ProjectName: item.ProjectName,
        AptaraContactName: item.AptaraContactName,
        AptaraContact: item.AptaraContact,
        SurveyCreatedOn: item.SurveyCreatedOn,
        ClientDate: item.ClientDate,
        IsSurveySubmitted: item.IsSurveySubmitted
        // Add other properties as needed
      }));
  
      // Convert selected data to Excel format
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedColumns);
  
      // Create a workbook with a single worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      // Save the workbook to a file
      XLSX.writeFile(wb, 'exported-data.xlsx');
  
    } else {
     
    }
  }
  
  

  onSort(event: any) {
    this.sortField = event.field;
    this.sortOrder = event.order
  }
  fromDate!: any;
  toDate!: any;
  projectId:any;
  selectedClient: any = "0";
  @Input() selectedOutputClient: any;
  clients: any=[];
  resultList: any=[]; 
  Project:any=[]
  projectName:any=[]
  selectedProject:any = "0";
  selectedClientName:any
  ClientNameForLink:any
  ProjectNameForLink:any
  FirstName:any;
  storedFirstName:any=[]
  RoleId:any
  Role:any
  UserMasterID:any

  ngOnInit(){
    this.GetLocalStorageData();
    this.GetClient();
  }


  onProjectChange(SelectedProjectTemp:string):void{
   const [selectedClientI, selectedClientNam] = SelectedProjectTemp.split(':');
   const [selectedClientId, selectedClientName] = selectedClientNam.split(':');
   console.log(selectedClientId,selectedClientName)
   const Project =this.selectedProject.split(':')
   this.projectId=Project[0]
   this.ProjectNameForLink= Project[1]
   console.log(this.projectId)
  }


  ClientForLink:any
  onClientChange(selectedClientTemp:any): void {
    if(this.selectedClient.length>0){
    const ClientArr =this.selectedClient.split(':')
    console.log(ClientArr)
    this.ClientForLink=ClientArr[0]
    this.ClientNameForLink= ClientArr[1]
    console.log(this.ClientNameForLink)
    if (this.ClientForLink) {
      console.log(this.ClientForLink)
      this.service.GetProject(this.ClientForLink,this.RoleId,this.UserMasterID).subscribe({
        next :(response:any) => {
        this.Project = response.Data
        this.Project.forEach((element: any) => {
         this.projectName= element.ProjectName;
         });
        }
      });
    }
  }
    
  }
  closeLinkModal(){
    this.linkButtonClicked= false
  }

  //get client for dropdown
  GetClient(){
    this.service.getClientList(this.RoleId,this.UserMasterID).subscribe({
      next: (data: any) => {
       this.clients = data.Data;
       if(this.clients!=null){
       this.clients.forEach((element: any) => {
        this.projectName  = element.ClientId;
       });
      }
      }
    });
  }

  //filter data by client and project id
  submitForm() {
    this.service.getClientDetails(this.fromDate, this.toDate,this.projectId, this.ClientForLink).subscribe({
      next: (data: any) => {
       this.resultList = data.Data; 
      }
    });
  }

//Open modal with project id and client id
  linkButtonClicked: boolean = false;
  openLinkModal(client: any): void {
    this.linkButtonClicked=true
    if (client) {
      this.selectedOutputClient = client; // Assign the selected client to the variable
      this.linkModalData.patchValue({
        ClientId: this.ClientForLink,
        ProjectId: this.projectId,
        ClientName: this.selectedOutputClient.ClientName || '', // Use default value if undefined
        ProjectName: this.selectedOutputClient.ProjectName || '', // Use default value if undefined
        Clientemail: this.selectedOutputClient.AptaraContact || '', // Use default value if undefined
        Remark: ''
      });
    } else {
      console.error('Client object is undefined or null.');
    }
  }

  //modal submit
  ModalButtonClicked:boolean = false
  submitModalForm(event: any) {
    this.ModalButtonClicked = true
  console.log(this.linkModalData.value)
  this.linkModalData.controls.CreatedBy.setValue(this.UserMasterID)
  this.linkModalData.controls.LastUpdatedBy.setValue(this.UserMasterID)
    this.service.submitModalData(this.linkModalData.value).subscribe({
      next: (data: any) => {
        this.resultList = data.Data;  
        this.submitForm();   
      },
      error: (error: any) => {
        console.error('Error submitting form:', error);
      }
    });   
    
  }

//Email validation
   multipleEmailsValidator(control: AbstractControl): { [key: string]: any } | null {
    const emails = (control.value as string).split(',').map(email => email.trim());
    const valid = emails.every(email => Validators.email(new FormControl(email)) == null);
    return valid ? null : { invalidEmails: true };
  }

  sendData(Client: any ){
    this.service.submitRecentData(Client).subscribe({
      next: (data: any) => {
        this.resultList = data.Data;  
        this.submitForm();   
      },
      error: (error: any) => {
        console.error('Error submitting form:', error);
      }
    });   
  }


}
