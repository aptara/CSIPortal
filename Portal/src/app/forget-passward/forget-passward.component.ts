import { Component } from '@angular/core';
import { UserManagement } from '../Services/UserManagementService';
UserManagement
@Component({
  selector: 'app-forget-passward',
  templateUrl: './forget-passward.component.html',
  styleUrls: ['./forget-passward.component.css']
})
export class ForgetPasswardComponent {
  constructor( private UserManagement:UserManagement){

  }
  email:any;
  data:any
  sendEmail() {
    debugger
    this.UserManagement.ForgetPassward(this.email).subscribe((res:any)=>{
      console.log(res)
      this.data = res.Data
    
    })
    alert(`Email sent to ${this.email}!`);
  }
}
