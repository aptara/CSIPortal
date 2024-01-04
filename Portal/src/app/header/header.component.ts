import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ChangePasswordService } from '../Services/change-password.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
FirstName:any;
storedFirstName:any=[]
LoggedUserName:any
SirName:any
showNavbar = false;
changePassModalData: FormGroup | any;
userID:any
userPass:any

ngOnInit(){
  this.storedFirstName = localStorage.getItem('loginDetails');

 // Check if the value is not null before parsing
 if (this.storedFirstName !== null) {
   this.FirstName = JSON.parse(this.storedFirstName);
   console.log(this.FirstName[0].FirstName);
   this.LoggedUserName = this.FirstName[0].FirstName;
   this.SirName = this.FirstName[0].LastName;
   this.userID=this.FirstName[0].UserMasterID;
   this.userPass=this.FirstName[0].Password;
 }
}

constructor(private service:ChangePasswordService,private fb: FormBuilder,
  private dialogService: DialogService){
  this.changePassModalData =  this.fb.group({  
    UserMasterID:[this.userID], 
    NewPassword: ['',[Validators.required]],
    ConfirmPassword: ['',[Validators.required]],
    OldPassword:['',[Validators.required, this.oldPasswordSameAsUserpassValidator(this.userPass)]]    
  }, {
    validators: [this.passwordsMatchValidator(), this.oldPasswordDifferentValidator(),this.oldPasswordSameAsUserpassValidator(this.userPass)]
  }); 

}

toggleNavbar() {
  this.showNavbar = !this.showNavbar;
  this.changePassModalData.patchValue({
    UserMasterID: this.userID,
  });
}


submitModalForm(event: any) {
  // console.log(this.changePassModalData.value)
  if (this.changePassModalData.valid) {
    console.log(this.changePassModalData.value);
    
    this.service.submitModalData(this.changePassModalData.value).subscribe({
      next: (data: any) => {
        // this.resultList = data.Data;  
        // this.submitForm();   
        const ref = this.dialogService.open(DialogeComponent, {
          header: 'Information',
          style: {
            'min-width': '500px',
            'min-height': '200px', // Adjust the height as needed
          },
          data: {
            message: 'Password Changed Succesfully.',
          },
        });
        ref.onClose.subscribe((confirmed: boolean) => {
          // window.location.href = '/ClientMaster';
        })
      },
      error: (error: any) => {
        console.error('Error submitting form:', error);
      }
    });   
  } else {
    
    console.log('Form is not valid');
  }
  }
  
   passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPasswordControl = control.get('NewPassword');
      const confirmPasswordControl = control.get('ConfirmPassword');
  
      if (newPasswordControl && confirmPasswordControl) {
        const newPassword = newPasswordControl.value;
        const confirmPassword = confirmPasswordControl.value;
  
        return newPassword === confirmPassword ? null : { passwordsMatch: true };
      }
  
      return null;
    };
  }
  
   oldPasswordDifferentValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPasswordControl = control.get('NewPassword');
      const oldPasswordControl = control.get('OldPassword');
  
      if (newPasswordControl && oldPasswordControl) {
        const newPassword = newPasswordControl.value;
        const oldPassword = oldPasswordControl.value;
  
        return newPassword !== oldPassword ? null : { oldPasswordDifferent: true };
        
      }
  
      return null;
    };
  }

  oldPasswordSameAsUserpassValidator(userpass: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const oldPasswordControl = control.get('OldPassword');
  
      if (oldPasswordControl) {
        const oldPassword = oldPasswordControl.value;
  
        // Add the comparison with userpass
        return oldPassword === this.userPass ? null : { oldPasswordSameAsUserpass: true };
      }
  
      return null;
    };
  }
  
  
}
