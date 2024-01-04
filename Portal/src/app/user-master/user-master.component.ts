import { Component } from '@angular/core';
import { UserService } from '../UserService';
import { UserManagement } from '../Services/UserManagementService';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';
@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent {
  users: any[] = [];
  isChecked: boolean = false;
  isIncludeDeleted: any;

  constructor(private userService: UserService,
    private UserManagementService: UserManagement,
    private dialogService: DialogService,
    private Router: Router) { }

  ngOnInit() {

    this.GetUser(this.isIncludeDeleted)
  }

  editUser(Id: any) {
    if (Id) {
      this.Router.navigate(['/UpdateUser', Id]);
      console.log(Id);
    }
  }


  deleteUser(user: any) {
    this.UserManagementService.DeleteUser(user).subscribe(res => {
      const ref = this.dialogService.open(DialogeComponent, {
        header: 'Information',
        style: {
          'min-width': '500px',
          'min-height': '200px',
        },
        data: {
          message: 'Record Deleted Succesfully.',
        },
      });
      ref.onClose.subscribe((confirmed: boolean) => {
        window.location.href = '/UserMaster';
      })
    })
  }



  GetUser(isDeleted: any) {
    this.UserManagementService.GetUserDetail(isDeleted).subscribe((response: any) => {
      this.users = response.Data
      console.log(response.Data)
    }

    )
  }

  onUnableButtonClick(user: any) {
    this.UserManagementService.EnableUser(user).subscribe(res => {
      const ref = this.dialogService.open(DialogeComponent, {
        header: 'Information',
        style: {
          'min-width': '500px',
          'min-height': '200px', // Adjust the height as needed
        },
        data: {
          message: 'Record Enabled Succesfully.',
        },
      });
      ref.onClose.subscribe((confirmed: boolean) => {
        window.location.href = '/UserMaster';
      })
      this.ngOnInit()
    }
    )
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
