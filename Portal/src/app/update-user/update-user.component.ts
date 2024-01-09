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
  Roles: any = []
  Projects: any = []
  ProjectsData: any = []
  UserAdd: FormGroup | any
  SelectedRole: any
  Tasks: any[] = [];
  checkbox: any[] = []
  tmId: any = ""
  UserID: any
  isIncludeDeleted: any;
  storedFirstName:any;
  StoredData:any;
  UsermasterId:any;
  RoleId:any;
  constructor(
    private service: UserManagement,
    private FilterClientListService: FilterClientListService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private dialogService: DialogService
  ) {
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
      'ProjectId': new FormControl(''),
      'LastUpdatedBy':new FormControl('')
    });
  }

  ngOnInit() {
    this.getRole()
    this.getProject()
    this.GetUserData()
    this.GetLocalStorageDataForId()
  }
  getRole() {
    this.service.GetRole().subscribe((res: any) => {
      // this.Roles = res.Data.slice(1);
      this.Roles = res.Data;
    })
  }
  isRoleDisabled(): boolean {
    const roleValue = this.RoleId;
    return roleValue === '3';
  }
  
  getProject() {
    this.FilterClientListService.GetProjectMasterDetails(this.isIncludeDeleted).subscribe(res => {
       this.Projects = res;      
    })
  }

  // getProject() {
  //   this.FilterClientListService.GetProjectMasterDetails().subscribe(res => {
  //     // Check if the response is an object
  //     if (typeof res === 'object') {
  //       // Convert object properties to an array
  //       this.Projects = Object.values(res).filter((project: any) => project.isActive === true);
  //     } else {
  //       console.error('Invalid response format'); // Handle invalid response
  //     }
  //   });
  // }
  

  submitForm() {
    this.UserAdd.controls.ProjectId.setValue(this.tmId);
    console.log(localStorage.getItem('loginDetails'));
    // localStorage.getItem('loginDetails');
    // localStorage.setItem('loginDetails',JSON.stringify(this.UserAdd.value))
    this.service.UpdateUser(this.UserAdd.value).subscribe(res => {

      this.Projects = Array.isArray(res) ? res : [res];
      const ref = this.dialogService.open(DialogeComponent, {
        header: 'Information',
        style: {
          'min-width': '400px',
          'min-height': '200px', // Adjust the height as needed
        },
        data: {
          message: 'Record updated Successfully.',
        },
      });

      ref.onClose.subscribe((confirmed: boolean) => {
        window.location.href = '/UserMaster';
      });

    });
  }

  GetLocalStorageDataForId(){
    this.storedFirstName = localStorage.getItem('loginDetails');

    // Check if the value is not null before parsing
    if (this.storedFirstName !== null) {
      this.StoredData = JSON.parse(this.storedFirstName);
      console.log(this.StoredData[0].UserMasterID);
      this.UsermasterId = this.StoredData[0].UserMasterID;
      this.RoleId = this.StoredData[0].RoleId;
    }
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

  data: any = []
  GetUserData() {
    this.UserID = this.ActivatedRoute.snapshot.params['Id'];
    console.log(this.UserID)
    this.service.GetUserbyId(this.UserID).subscribe((response: any) => {
      this.data = response.Data;
      console.log(this.data)
      // this.UserAdd.controls.UserMasterID.setValue(this.data.Data.UserMasterID);
      this.UserAdd.controls.FirstName.setValue(this.data[0].FirstName);
      this.UserAdd.controls.LastName.setValue(this.data[0].LastName);
      this.UserAdd.controls.LastUpdatedBy.setValue(this.UsermasterId);
      this.UserAdd.controls.Email.setValue(this.data[0].Email);
      this.UserAdd.controls.Role.setValue(this.data[0].RoleId);
      this.UserAdd.controls.UserMasterID.setValue(this.UserID);
      this.checkbox = this.Tasks.filter(task => this.IsTaskCheckBoxChecked(task));
      const selectedTasks = this.checkbox.map(task => task.TaskMasterID);
      this.tmId = selectedTasks.join(",");
      if (this.data[0].ProjectId !== null) {
        this.tmId = this.data[0].ProjectId;
      }
    })
  }
  onCheckboxChange(Project: any, e: any) {
    var Ids: any = []
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
    this.checkbox.forEach(ProjectName => {
      Ids.push(ProjectName.ProjectId)      
    })
    if (this.tmId != "") {
      this.tmId += "," + Project.ProjectId;
    }else
    {
      this.tmId += Ids.join(",")
    }

    // this.updateTmId();
  }

  updateTmId() {
    const SelectedRoleIds = this.checkbox.map(Project => Project.ProjectId);
    this.tmId = SelectedRoleIds.join(",");
  }

  ProjectIDs: any
  IsTaskCheckBoxChecked(Project: any) {
    if (this.data.length !== 0) {
      if (this.data[0].ProjectId !== null) {
      this.ProjectIDs = this.data[0].ProjectId.split(",");
      return this.ProjectIDs.includes(Project.ProjectId.toString());
      }
    } else {
      return false;
    }
  }


}
