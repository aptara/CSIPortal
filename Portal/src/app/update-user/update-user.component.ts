import { Component } from '@angular/core';
import { UserManagement } from '../Services/UserManagementService';
import { FilterClientListService } from '../filter-client-list/filter-client-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  Roles:any=[]
  Projects:any=[]
  UserAdd:FormGroup|any
  SelectedRole:any
  Tasks: any[] = [];
  checkbox: any[] = []
  tmId: any = ""
  UserID:any
  constructor(
    private service:UserManagement,
    private FilterClientListService: FilterClientListService,
    private router:Router,
    private ActivatedRoute:ActivatedRoute,
    private dialogService: DialogService
  ){
    this.UserAdd = new FormGroup({
      'UserMasterID': new FormControl(''),
      'FirstName': new FormControl('', [
          Validators.required,
          //Validators.pattern('[a-zA-Z]+')
      ]),
      'LastName': new FormControl('', [
          Validators.required,
          // Validators.pattern('[a-zA-Z]+')
      ]),
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'Role': new FormControl(''),
      'ProjectId':new FormControl(''),
 
  });
  }

ngOnInit(){
this.getRole()
this.getProject()
this.GetUserData()
}
getRole(){
  this.service.GetRole().subscribe(res=>{
this.Roles= res
  })
}
getProject(){
  this.FilterClientListService.GetProjectMasterDetails().subscribe(res=>{
this.Projects = res;
  })
}
  submitForm(){
    this.UserAdd.controls.ProjectId.setValue(this.tmId);
    console.log(this.UserAdd)
    this.service.UpdateUser(this.UserAdd.value).subscribe(res=>{
      debugger
      this.Projects = res;
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

//   onCheckboxChange(Project: any, e: any) {
//     var Ids: any = []
//     if (e.target.checked) {
//         this.checkbox.push(Project)
//         console.log(this.checkbox)
//     }
//     else {
//         this.checkbox.forEach((value, index) => {
//             if (value == Project)
//                 this.checkbox.splice(index, 1)
//               console.log(value,Project)
//         })
//     }
//     this.checkbox.forEach(ProjectName => {
//         Ids.push(ProjectName.ProjectId)
//         this.tmId = Ids.join(",")
//     })
// }

data:any=[]
 GetUserData() {
  this.UserID = this.ActivatedRoute.snapshot.params['Id'];
  console.log(this.UserID)
  this.service.GetUserbyId(this.UserID).subscribe((response:any)=>{
    this.data = response.Data;
    console.log(this.data)
   // this.UserAdd.controls.UserMasterID.setValue(this.data.Data.UserMasterID);
    this.UserAdd.controls.FirstName.setValue(this.data[0].FirstName);
    this.UserAdd.controls.LastName.setValue(this.data[0].LastName);
   
    this.UserAdd.controls.Email.setValue(this.data[0].Email);
     this.UserAdd.controls.Role.setValue(this.data[0].RoleId);
     this.UserAdd.controls.UserMasterID.setValue(this.UserID);
     this.checkbox = this.Tasks.filter(task => this.IsTaskCheckBoxChecked(task));
     const selectedTasks = this.checkbox.map(task => task.TaskMasterID);
     this.tmId = selectedTasks.join(",");
  })
}
onCheckboxChange(Project: any, e: any) {
  if (e.target.checked) {
      this.checkbox.push(Project);
  } else {
      const index = this.checkbox.findIndex(value => value === Project);
      if (index !== -1) {
          this.checkbox = this.checkbox.filter(function (record) {
              return record.ProjectId !== Project.ProjectId;
          });
      }
  }

  this.updateTmId();
}

updateTmId() {
  const SelectedRoleIds = this.checkbox.map(Project => Project.ProjectId);
  this.tmId = SelectedRoleIds.join(",");
}

ProjectIDs: any
IsTaskCheckBoxChecked(Project: any) {
  if (this.data) {
      this.ProjectIDs = this.data[0].ProjectIds.split(",");
      return this.ProjectIDs.includes(Project.ProjectId.toString());

  } else {
      return false;
  }
}


}
