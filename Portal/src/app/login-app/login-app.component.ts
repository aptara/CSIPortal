import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginAppService } from './login-app.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';
interface UserData {
  EmailId: string;
  Password: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent {
  UserMasterDetails: FormGroup | any;
  isFormSubmitted = false;
  loginDetails: any = [];

  constructor(private loginAppService: LoginAppService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private dialogService: DialogService) {
    this.UserMasterDetails = new FormGroup({
      'EmailId': new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required),
    });
  }

  onsubmit() {
    this.isFormSubmitted = true;
  console.log(this.UserMasterDetails)
    if (this.UserMasterDetails.valid) {
      this.loginAppService.GetUsermasterDetails(this.UserMasterDetails.value).subscribe(res => {
        this.loginDetails = res;
        console.log(this.loginDetails);
        localStorage.setItem('loginDetails', JSON.stringify(this.loginDetails.Data));
        // Check each user's credentials
        const validUser = this.loginDetails.Data.find((user: UserData) =>
          user.EmailId === this.UserMasterDetails.value.EmailId &&
          user.Password === this.UserMasterDetails.value.Password
         
        );
        console.log(this.UserMasterDetails.value.Password)
        if (validUser) {
        window.location.href = '/Dashboard/';
        } else {
       
          this.showSuccessDialog();
        }
      });
    } else {
     
    this.showWarningDialog()
    }
  }

  private showSuccessDialog(): void {
    const ref = this.dialogService.open(DialogeComponent, {
      header: 'Warning',
      
      data: {
        message: 'This user is not registered. Please contact to administrator.',
      },
    });

    ref.onClose.subscribe(() => {
      // Handle dialog closed event if needed
    });
  }

  private showWarningDialog(): void {
    const ref = this.dialogService.open(DialogeComponent, {
      header: 'Warning',
      width: '300px',
      data: {
        message: 'Please fill Username and Password.',
      },
    });

    ref.onClose.subscribe(() => {
      // Handle dialog closed event if needed
    });
  }
}
