import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginAppService } from './login-app.service';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent {
  UserMasterDetails: FormGroup | any;
  isFormSubmitted = false;
  loginDetails :any = [];

  constructor(private loginAppService: LoginAppService,
    private fb: FormBuilder) {
    this.UserMasterDetails = new FormGroup({
      'EmailId': new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required),
    });
  }

  onsubmit() {
    this.isFormSubmitted = true;
    if (this.UserMasterDetails.valid) {
      this.loginAppService.GetUsermasterDetails(this.UserMasterDetails.value).subscribe(res => {
        this.loginDetails = res;
        console.log(this.loginDetails);
        if (this.loginDetails.Data[0].EmailId == this.UserMasterDetails.value.EmailId && this.loginDetails.Data[0].Password == this.UserMasterDetails.value.Password) {
          alert("Login Succesfull")
          window.location.href='/filterClientList/';
        }
        else{
          alert("Please Enter Valid Username and Password")
        }
      })
    }
    else {
      alert("Please fill Username and Password")
    }
  }

}
