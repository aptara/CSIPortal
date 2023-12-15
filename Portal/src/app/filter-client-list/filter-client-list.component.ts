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
      Remark : ['']
    });
    
  //   this.linkModalData = new FormGroup({
  //     ClientId:new FormControl(),
  //     ProjectId:new FormControl(),
  //     Clientemail: new FormControl(),
  //     ClientName: new FormControl(),
  //     ProjectName: new FormControl(),
  //     Remark: new FormControl()
  // });
  }

  // exportData(): void {
  //   if (this.resultList && this.resultList.length > 0) {
  //     // Convert data to Excel format
  //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.resultList);

  //     // Create a workbook with a single worksheet
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //     // Create a Blob from the workbook
  //     const blob: Blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' as 'string' });

  //     // Create a downloadable link
  //     const url = URL.createObjectURL(blob);

  //     // Create a link element and trigger a click event
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'exported-data.xlsx';
  //     a.click();

  //     // Release the object URL to free up resources
  //     URL.revokeObjectURL(url);

  //     // Show a success message to the user
  //     this.messageService.add({ severity: 'success', summary: 'Export Successful', detail: 'Data exported successfully.' });
  //   } else {
  //     // Show a warning message if there is no data to export
  //     this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'There is no data to export.' });
  //   }
  // }

  onSort(event: any) {
    // Handle sorting
    this.sortField = event.field;
    this.sortOrder = event.order;
    // Reload data or perform sorting logic
  
  }
  fromDate!: any;
  toDate!: any;
  projectId:any;
  selectedClient:any=[];
  @Input() selectedOutputClient: any;
  clients: any=[];
  resultList: any=[]; 
  Project:any=[]
  projectName:any=[]
  selectedProject:any =[]
  selectedClientName:any
  ClientNameForLink:any
  ProjectNameForLink:any

  ngOnInit(){
    this.GetClient();
    // this.submitForm();
    //  this.linkModalData =  this.fb.group({
    //   Clientemail: [''],
    //   ClientName: [''],
    //   ProjectName: [''],
    //   Remark : ['']
    // });
  }
  onProjectChange(SelectedProjectTemp:string):void{

   //this.projectId = SelectedProjectTemp
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
   
   // this.selectedClientName = selectedClientTemp.ClientName;
   // this.selectedClient = selectedClientTemp.ClientId
    const [selectedClientI, selectedClientNam] = selectedClientTemp.split(':');
    const [selectedClientId, selectedClientName] = selectedClientNam.split(':');
    console.log(selectedClientId,selectedClientName)
    const ClientArr =this.selectedClient.split(':')
   console.log(ClientArr)
   this.ClientForLink=ClientArr[0]
   this.ClientNameForLink= ClientArr[1]
   console.log(this.ClientNameForLink)
    // Call your API service here and pass the selected client ID
    if (this.ClientForLink) {
    
      console.log(this.ClientForLink)
      this.service.GetProject(this.ClientForLink).subscribe({
        next :(response:any) => {
        // Handle the API response here
       
        this.Project = response.Data
       // console.log(this.Project.ProjectName)
       
        this.Project.forEach((element: any) => {
         this.projectName= element.ProjectName;
           //console.log(projectName)

         });
        }
      });
    }
    
  }

  GetClient(){
    this.service.getClientList().subscribe({
      next: (data: any) => {
       this.clients = data.Data;
      //  console.log(this.clients[0].ClientId)
       this.clients.forEach((element: any) => {
        this.projectName  = element.ClientId;
        // console.log(clientid)
       });
      }
    });
  }
  submitForm() {
    this.service.getClientDetails(this.fromDate, this.toDate,this.projectId, this.ClientForLink).subscribe({
      next: (data: any) => {
       this.resultList = data.Data; 
      }
    });
  }
  openLinkModal(client: any): void {
    debugger;
    
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
  
  submitModalForm(event: any) {
debugger
console.log(this.linkModalData.value)
    this.service.submitModalData(this.linkModalData.value).subscribe({
      next: (data: any) => {
        this.resultList = data.Data;  
        this.submitForm();   
      },
      error: (error: any) => {
        console.error('Error submitting form:', error);
      }
    });    
    // event.preventDefault();
    // return false;
  }

  //  multipleEmailsValidator(control: AbstractControl): { [key: string]: any } | null {
  //   const emails = control.value.split(';').map((email: string) => email.trim());
  
  //   const valid = emails.every((email: any) => Validators.email(new FormControl(email)));
  
  //   return valid ? null : { invalidEmails: true };
  // }

   multipleEmailsValidator(control: AbstractControl): { [key: string]: any } | null {
    const emails = (control.value as string).split(',').map(email => email.trim());

    const valid = emails.every(email => Validators.email(new FormControl(email)) == null);
  
    return valid ? null : { invalidEmails: true };
  }

  GetName(name:any){
console.log(name)
  }
}
