import { Component } from '@angular/core';
import { UserService } from '../UserService';
import { UserManagement } from '../Services/UserManagementService';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css'],
  providers: [ConfirmationService]
})
export class UserMasterComponent {
  users: any[] = [];
  isChecked: boolean = false;
  isIncludeDeleted: any;

  constructor(private userService: UserService,
    private UserManagementService: UserManagement,
    private dialogService: DialogService,
    private Router: Router,
    private ConfirmationService:ConfirmationService ) { }

  ngOnInit() {

    this.GetUser(this.isIncludeDeleted)
  }

  editUser(Id: any) {
    if (Id) {
      this.Router.navigate(['/UpdateUser', Id]);
      console.log(Id);
    }
  }


      deleteUser(user: any,event:Event) {
        this.ConfirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass:"p-button-danger p-button-text",
          rejectButtonStyleClass:"p-button-text p-button-text",
          acceptIcon:"none",
          rejectIcon:"none",
    
          accept: () => {
              // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
              this.UserManagementService.DeleteUser(user).subscribe(res => {
              const ref = this.dialogService.open(DialogeComponent, {
                header: 'Information',
              
                data: {
                  message: 'Record updated Succesfully.',
                },
              });
              ref.onClose.subscribe((confirmed: boolean) => {
               
                window.location.href = '/UserMaster';
              })
            })
           
          },
       
          reject: () => {
              // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          }
      });
      }
    


  GetUser(isDeleted: any) {
    this.UserManagementService.GetUserDetail(isDeleted).subscribe((response: any) => {
      this.users = response.Data
      console.log(response.Data)
    }

    )
  }

  onUnableButtonClick(user: any,event:Event) {

  
   this.ConfirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Do you want to Enable this record?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass:"p-button-danger p-button-text",
          rejectButtonStyleClass:"p-button-text p-button-text",
          acceptIcon:"none",
          rejectIcon:"none",
          accept: () => {
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.UserManagementService.EnableUser(user).subscribe(res => {
            const ref = this.dialogService.open(DialogeComponent, {
              header: 'Information',
            
              data: {
                message: 'Record updated Succesfully.',
              },
            });
            ref.onClose.subscribe((confirmed: boolean) => {
             
              window.location.href = '/UserMaster';
            })
          })
         
        },
     
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
      });
  }
  
      
    

  retrieveData(): void {
    if (this.isChecked) {
      // Checkbox is checked, retrieve data accordingly
      this.isIncludeDeleted=1;
      this.ngOnInit()
    } else {
      // Checkbox is not checked, handle accordingly
      this.isIncludeDeleted=0;
      this.ngOnInit()
    }
  }
}
