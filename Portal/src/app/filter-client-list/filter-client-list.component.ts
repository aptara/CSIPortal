// import { Component, ViewChild } from '@angular/core';
import { FilterClientListService } from './filter-client-list.service';
import { Component, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-filter-client-list',
  templateUrl: './filter-client-list.component.html',
  styleUrls: ['./filter-client-list.component.css']
})
export class FilterClientListComponent {
  linkModalData: FormGroup | any;
  constructor(private service:FilterClientListService,
    private fb: FormBuilder){
    // this.linkModalData =  this.fb.group({
    //   Clientemail: [''],
    //   ClientName: [''],
    //   ProjectName: [''],
    //   Remark : ['']
    // });
    
    this.linkModalData = new FormGroup({
      ClientId:new FormControl(),
      ProjectId:new FormControl(),
      Clientemail: new FormControl(),
      ClientName: new FormControl(),
      ProjectName: new FormControl(),
      Remark: new FormControl()
  });
  }
 
  fromDate!: any;
  toDate!: any;
  selectedClient=1;
  @Input() selectedOutputClient: any;
  clients: any=[];
  resultList: any=[];
  // Clientemail:any;
  // ClientName: any; 
  // ProjectName: any; 
 
  ngOnInit(){
    this.GetClient()
    //  this.linkModalData =  this.fb.group({
    //   Clientemail: [''],
    //   ClientName: [''],
    //   ProjectName: [''],
    //   Remark : ['']
    // });
  }

  GetClient(){
    this.service.getClientList().subscribe({
      next: (data: any) => {
       this.clients = data.Data; 
      }
    });
  }
  submitForm() {
    this.service.getClientDetails(this.fromDate, this.toDate, this.selectedClient).subscribe({
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

  submitModalForm(event:any){
    this.service.submitModalData(this.linkModalData.value).subscribe({
      next: (data: any) => {
       this.resultList = data.Data; 
       event.preventDefault();
       return false;
      }
    });

    // this.service.getClientDetails(null,null,this.linkModalData.value.ClientId).subscribe({
    //   next: (data: any) => {
    //    this.resultList = data.Data; 
    //   }
    // });
    event.preventDefault();
    return false;
  }
}
