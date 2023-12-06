import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { LogindataService } from '../logindata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
resetpassword=false;
  title = 'firstapp';
  loginform:FormGroup|any;
  posts:any;
  displayStyle = "none";
 
  constructor(private service:LogindataService,) {}

ngOnInit(){
  this.loginform= new FormGroup({
    'emailId' :new FormControl(null,Validators.required),
    'password' : new FormControl(null,Validators.required),
    'validEmail':new FormControl(null,Validators.required)
  }) 
  
}

onsubmit(){
  
  this.service.getUsers(this.loginform.controls.emailId.value).subscribe(response => {
  
   if(response != null){
    this.posts = response;
      if(this.posts.Password == this.loginform.controls.password.value){
        alert("Login is successful")
        window.location.href='/welcome';
      }
      else {
       alert("Password is incorrect")
      }
   }
   else {
    alert("Please enter valid Email Id")
   }
  
  });
}

openPopup() {
  this.displayStyle = "block";
}
ValidatePopup() {
this.service.getUsers(this.loginform.controls.validEmail.value).subscribe(res=>{
  console.log(res)
  if (res != null){
    alert("Emaild is valid ")
    this.resetpassword= true;
  }

  else{
    alert("Emalid is not valid")
    this.resetpassword= false;
  }
})
  this.displayStyle = "block";
}
closePopup(){
  this.displayStyle="none";
}
resetPassword(){
  this.service.SendEmail(this.loginform.controls.validEmail.value).subscribe(mail=>{
   console.log(mail)
    if(mail=!null){
     
      alert("Password sent to your Email")
    }
    else{
      alert("not sent");
    }
  })
}
}
