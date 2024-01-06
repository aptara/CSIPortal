import { Component } from '@angular/core';
import { UserManagement } from '../Services/UserManagementService';
import { FilterClientListService } from '../filter-client-list/filter-client-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';

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
  isIncludeDeleted: any;
  storedFirstName:any;
  StoredData:any;
  UsermasterId:any
  GetLocalStorageDataForId(){
    this.storedFirstName = localStorage.getItem('loginDetails');

    // Check if the value is not null before parsing
    if (this.storedFirstName !== null) {
      this.StoredData = JSON.parse(this.storedFirstName);
      console.log(this.StoredData[0].UserMasterID);
      this.UsermasterId = this.StoredData[0].UserMasterID;
    }
  }

  constructor(
    private service:UserManagement,
    private FilterClientListService: FilterClientListService,
    private dialogService: DialogService,
  ){
    this.UserAdd = new FormGroup({
      'FirstName': new FormControl('', [
          Validators.required,
      ]),
      'LastName': new FormControl('', [
          Validators.required,
 
      ]),
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'Role': new FormControl(this.SelectedRole),
      'ProjectId':new FormControl(''),
      'CreatedBy':new FormControl('')
 
  });
  }
  
ngOnInit(){
this.getRole()
this.getProject()
this.GetLocalStorageDataForId()
console.log(this.UserAdd)
}
getRole() {
  this.service.GetRole().subscribe((res:any) => {
    // Exclude the first array element
    this.Roles = res.Data.slice(1);
  });
}


getProject(){
  this.FilterClientListService.GetProjectMasterDetails(this.isIncludeDeleted).subscribe(res=>{
this.Projects = res;
  })
}
  submitForm(){
    this.UserAdd.controls.CreatedBy.setValue(this.UsermasterId)
    this.UserAdd.controls.ProjectId.setValue(this.tmId);
    this.service.AddUserDetail(this.UserAdd.value).subscribe(res=>{
     
      const ref = this.dialogService.open(DialogeComponent, {
              header: 'Information',
              data: {
                message: 'Record saved Succesfully.',
              },
            });
            ref.onClose.subscribe((confirmed: boolean) => {
              window.location.href = '/UserMaster';
            })

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
