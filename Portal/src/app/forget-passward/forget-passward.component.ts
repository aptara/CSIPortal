import { Component } from '@angular/core';
import { UserManagement } from '../Services/UserManagementService';
import { DialogeComponent } from '../dialoge/dialoge.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-forget-passward',
  templateUrl: './forget-passward.component.html',
  styleUrls: ['./forget-passward.component.css']
})
export class ForgetPasswardComponent {
  constructor( private UserManagement:UserManagement,
    private dialogService: DialogService){

  }
  email:any;
  data:any
  TocheckId:any
  sendEmail() {
    debugger
    this.UserManagement.ForgetPassward(this.email).subscribe((res:any)=>{
    
      this.data = res.Data
      this.TocheckId =this.data.ToCheckId
      if(this.TocheckId === -1){
        this.showErrorDialog()
      }
      else{
      this.showSuccessDialog();
      }
    })
    
  }
  private showSuccessDialog(): void {
    const ref = this.dialogService.open(DialogeComponent, {
      header: 'Warning',
      
      data: {
        message: 'Email Sent Successfully.',
      },
    });

    ref.onClose.subscribe(() => {
      // Handle dialog closed event if needed
    });
  }

  private showErrorDialog(): void {
    const ref = this.dialogService.open(DialogeComponent, {
      header: 'Warning',
      
      data: {
        message: 'Email is not Exist.',
      },
    });

    ref.onClose.subscribe(() => {
      // Handle dialog closed event if needed
    });
  }
}
