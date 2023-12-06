import { Component,Input } from '@angular/core';
import { LogindataService } from '../logindata.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @Input() EmailId:any;
  empDetail:any=[];
  employees:any=[];
  p: number = 1;

  constructor(private service:LogindataService,) {}
  ngOnInit(){

    this.service.getAllDetail().subscribe(data =>{
      this.employees= data;
     this.employees.forEach((ele:any) => {
      if(ele.StatusID!=0)
      {
        this.empDetail.push(ele);
      }
     });
      console.log(data);

    })  
  }

  onDelete(emp:any){
 
    emp.StatusID=0;
   if(confirm("Do you want to delete this record?")){
  
    this.service.updateEmp(emp.UserMasterID,emp).subscribe(res=>{
      console.log(res);
    })
  }
  
  setTimeout(() => {
    window.location.reload();
  }, 1000);
  
}



}
