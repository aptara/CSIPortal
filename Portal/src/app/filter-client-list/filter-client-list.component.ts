// import { Component, ViewChild } from '@angular/core';
import { FilterClientListService } from './filter-client-list.service';
import { Component, ElementRef, Input, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

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
    private messageService: MessageService,){
    this.linkModalData =  this.fb.group({
      ClientId:[''],
      ProjectId:[''],
      Clientemail: ['', [Validators.required, this.multipleEmailsValidator]],
      ClientName: [''],
      ProjectName: [''],
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
  onSort(event: any) {
    // Handle sorting
    this.sortField = event.field;
    this.sortOrder = event.order;
    // Reload data or perform sorting logic
  
  }
  fromDate!: any;
  toDate!: any;
  selectedClient:any=[];
  @Input() selectedOutputClient: any;
  clients: any=[];
  resultList: any=[]; 
  Project:any=[]
  projectName:any=[]
  selectedProject:any =[]
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
  SelectedProjectId:any
  onProjectChange(id:number):void{
  this.SelectedProjectId = id
  }
  onClientChange(): void {
    // Call your API service here and pass the selected client ID
    if (this.selectedClient) {
      console.log(this.selectedClient)
      this.service.GetProject(this.selectedClient).subscribe({
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
    this.service.getClientDetails(this.SelectedProjectId, this.selectedClient).subscribe({
      next: (data: any) => {
       this.resultList = data.Data; 
      }
    });
  }
  
  openLinkModal(client: any): void {
    this.selectedOutputClient = client; // Assign the selected client to the variable
    this.linkModalData.patchValue({
      ClientId:this.selectedOutputClient.ClientId,
      ProjectId: this.selectedOutputClient.ClientRefId,
      ClientName: this.selectedOutputClient.ClientName,
      ProjectName: this.selectedOutputClient.ProjectName,
      Clientemail: this.selectedOutputClient.AptaraContact, 
      Remark: ''
    });
  }

  submitModalForm(event: any) {

    this.service.submitModalData(this.linkModalData.value).subscribe({
      next: (data: any) => {
        this.resultList = data.Data;        
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
}
