import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterClientListService } from '../filter-client-list/filter-client-list.service';
import { ClientManagementService } from '../Services/client-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogeComponent } from '../dialoge/dialoge.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  Roles: any = []
  Projects: any = []
  ProjectsData: any = []
  ClientAdd: FormGroup | any
  SelectedRole: any
  Tasks: any[] = [];
  checkbox: any[] = []
  tmId: any = ""
  clientId: any
  clientData: any = []
  heading: any = ""
  isIncludeDeleted:any=""
  storedFirstName:any;
  StoredData:any;
  UsermasterId:any
  Project: any[] = []
  projectIds:any=""
  constructor(
    private service: ClientManagementService,
    private dialogService: DialogService,
    private FilterClientListService: FilterClientListService,
    private route: ActivatedRoute
  ) {
    this.ClientAdd = new FormGroup({
      'ClientId': new FormControl(''),
      'ClientName': new FormControl('', [
        Validators.required,
        //Validators.pattern('[a-zA-Z]+')
      ]),
      'ClientEmail': new FormControl('', [Validators.required, Validators.email]),
      'AptaraContact': new FormControl('', [Validators.required]),
      'AptaraContactEmail': new FormControl('', [Validators.required, Validators.email]),
      'ProjectId': new FormControl(''),
      'CreatedBy': new FormControl(''),
      'LastUpdatedBy':new FormControl('')
    });

  }

  ngOnInit() {
    // this.getRole()
    this.clientId = this.route.snapshot.queryParamMap.get('clientId');
    this.getProject()
    // this.getClient()
    if (this.clientId != null) {
      this.getClient()
      this.heading="Edit Client"
    }else{
      this.heading="Add Client"
    }
    this.GetLocalStorageDataForId()
  }
  GetLocalStorageDataForId(){
    this.storedFirstName = localStorage.getItem('loginDetails');

    // Check if the value is not null before parsing
    if (this.storedFirstName !== null) {
      this.StoredData = JSON.parse(this.storedFirstName);
      console.log(this.StoredData[0].UserMasterID);
      this.UsermasterId = this.StoredData[0].UserMasterID;
    }
  }

  getProject() {
    this.FilterClientListService.GetProjectMasterDetails(this.isIncludeDeleted).subscribe((res:any) => {
      this.Projects = res;
      this.Project=Object.values(res.Data);
    })
  }

  getClient() {
    // this.clientId = this.route.snapshot.queryParamMap.get('clientId');
    this.service.getClientbyId(this.clientId).subscribe({
      next: (data: any) => {
        this.clientData = data.Data;
        this.ClientAdd = new FormGroup({
          'ClientId': new FormControl(this.clientId),
          'ClientName': new FormControl(this.clientData.ClientName),
          'ClientEmail': new FormControl(this.clientData.ClientEmail),
          'AptaraContact': new FormControl(this.clientData.AptaraContact),
          'AptaraContactEmail': new FormControl(this.clientData.AptaraContactEmail),
          // 'Role': new FormControl(this.SelectedRole),
          'ProjectId': new FormControl(''),
          'LastUpdatedBy':new FormControl('')
        })
        if (this.clientData.ProjectId !== null) {
          this.tmId = this.clientData.ProjectId;
        }
        this.checkbox = this.Project.filter((task: any) => this.IsTaskCheckBoxChecked(task));
        const selectedTasks = this.checkbox.map(task => task.ProjectId);
        this.tmId = selectedTasks.join(",");
      }
    })
  }

  ProjectIDs: any
  IsTaskCheckBoxChecked(Project: any) {
    if (this.clientData.length !== 0) {
      if (this.clientData.ProjectId !== null) {
        this.ProjectIDs = this.clientData.ProjectId.split(",");
        // this.tmId=this.ProjectIDs.join(",");
        return this.ProjectIDs.includes(Project.ProjectId.toString());
      }
    } else {
      return false;
    }


  }

  submitForm() {
    //  this.ClientAdd.controls.ProjectId.setValue(this.tmId);
    if (this.clientId === null) {
      this.ClientAdd.controls.CreatedBy.setValue(this.UsermasterId);
      this.ClientAdd.controls.LastUpdatedBy.setValue(this.UsermasterId);
      this.ClientAdd.controls.ProjectId.setValue(this.tmId);
      this.service.AddClientDetails(this.ClientAdd.value).subscribe({
        next: (data: any) => {
          debugger
          this.ProjectsData = data.Data;
          const ref = this.dialogService.open(DialogeComponent, {
            header: 'Information',
            style: {
              'min-width': '500px',
              'min-height': '200px', // Adjust the height as needed
            },
            data: {
              message: 'Record saved Succesfully.',
            },
          });
          ref.onClose.subscribe((confirmed: boolean) => {
            window.location.href = '/ClientMaster';
          })
        }
        // window.location.href = '/ClientMaster';
      })

    } else {
      console.log(this.ClientAdd)
      this.ClientAdd.controls.LastUpdatedBy.setValue(this.UsermasterId);

      this.ClientAdd.controls.ProjectId.setValue(this.tmId);
      this.service.UpdateClientDetails(this.ClientAdd.value).subscribe({
        next: (data: any) => {
          debugger
          // this.Projects = data;
          this.ProjectsData = data.Data;
          const ref = this.dialogService.open(DialogeComponent, {
            header: 'Information',
           
            data: {
              message: 'Record Updated Successfully.',
            },
          });
          
          ref.onClose.subscribe((confirmed: boolean) => {
            window.location.href = '/ClientMaster';
          })
        }
        // window.location.href = '/ClientMaster';
      })
    }
  }

  onCheckboxChange(Project: any, e: any) {
    var Ids: any = []
    if (e.target.checked) {
      this.checkbox.push(Project)
    }
    else {
      this.checkbox.forEach((value, index) => {
        if (value == Project)
          this.checkbox.splice(index, 1)
      })
    }
    this.checkbox.forEach(ProjectName => {
      Ids.push(ProjectName.ProjectId)  
      this.tmId = Ids.join(",")      
    })
 
  
      this.updateTmId();
  }

  updateTmId() {
    const SelectedRoleIds = this.checkbox.map(Project => Project.ProjectId);
    this.tmId = SelectedRoleIds.join(",");
  }
}
