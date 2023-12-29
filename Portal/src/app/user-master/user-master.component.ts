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
  users: any[]=[];

  constructor(private userService: UserService,
    private UserManagementService:UserManagement,
    private dialogService: DialogService,
    private Router:Router) {}

  ngOnInit() {
    
  this.GetUser()
  }

  editUser(Id: any) {
    if (Id) {
      this.Router.navigate(['/UpdateUser', Id]);
      console.log(Id);
    }
  }
  

  deleteUser(user: any) {
    this.UserManagementService.DeleteUser(user).subscribe(res=>{
      const ref = this.dialogService.open(DialogeComponent, {
        header: 'Information',
        width: '300px',
        data: {
          message: 'Record updated Succesfully.',
        },
      });
      ref.onClose.subscribe((confirmed: boolean) => {
        window.location.href = '/UserMaster';
      })
 }) 
}

  

  GetUser(){
    this.UserManagementService.GetUserDetail().subscribe( (response:any) =>{
      this.users = response.Data
      console.log(response.Data)
    } 
   
    )
  }
}
