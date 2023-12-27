import { Component } from '@angular/core';
import { UserManagement } from '../Services/UserManagementService';
import { FilterClientListService } from '../filter-client-list/filter-client-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  Roles:any=[]
  Projects:any=[]
  UserAdd:FormGroup|any
  SelectedRole:any
  Tasks: any[] = [];
  checkbox: any[] = []
  tmId: any = ""
  constructor(
    private service:UserManagement,
    private FilterClientListService: FilterClientListService
  ){
    this.UserAdd = new FormGroup({
      'FirstName': new FormControl('', [
          Validators.required,
          //Validators.pattern('[a-zA-Z]+')
      ]),
      'LastName': new FormControl('', [
          Validators.required,
          // Validators.pattern('[a-zA-Z]+')
      ]),
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'Role': new FormControl(this.SelectedRole),
      'ProjectId':new FormControl(''),
 
  });
  }
  
ngOnInit(){
this.getRole()
this.getProject()
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
    this.service.AddUserDetail(this.UserAdd.value).subscribe(res=>{
      debugger
      this.Projects = res;
      window.location.href = '/UserMaster';
        }) 

  }

  onCheckboxChange(Project: any, e: any) {
    var Ids: any = []
    if (e.target.checked) {
        this.checkbox.push(Project)
        console.log(this.checkbox)
    }
    else {
        this.checkbox.forEach((value, index) => {
            if (value == Project)
                this.checkbox.splice(index, 1)
              console.log(value,Project)
        })
    }
    this.checkbox.forEach(ProjectName => {
        Ids.push(ProjectName.ProjectId)
        this.tmId = Ids.join(",")
    })
}
}
