// import { Component, ViewChild } from '@angular/core';
import { FilterClientListService } from './filter-client-list.service';
import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-filter-client-list',
  templateUrl: './filter-client-list.component.html',
  styleUrls: ['./filter-client-list.component.css']
})
export class FilterClientListComponent {
  constructor(private service:FilterClientListService){}
 
  fromDate!: Date;
  toDate!: Date;
  selectedClient:any;
  clients: any=[];
  resultList: any=[];

  ngOnInit(){
    this.GetClient()
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

  showFeedback(cId:any){
    // window.location.href='/MenuReadComponent/Show/'+cId;
  }
  
}
