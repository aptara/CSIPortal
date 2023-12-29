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
  // dialogService: any;
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
      'ProjectId': new FormControl('')

    });

  }

  ngOnInit() {
    // this.getRole()
    this.clientId = this.route.snapshot.queryParamMap.get('clientId');
    this.getProject()
    // this.getClient()
    if (this.clientId != null) {
      this.getClient()
    }
  }
  // getRole() {
  //   this.service.GetRole().subscribe(res => {
  //     this.Roles = res
  //   })
  // }

  getProject() {
    this.FilterClientListService.GetProjectMasterDetails().subscribe(res => {
      this.Projects = res;
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
          'ProjectId': new FormControl('')
        })
        // this.ClientAdd.controls.ClientName.setValue(this.clientData[0].ClientName);
        // this.ClientAdd.controls.ClientEmail.setValue(this.clientData[0].ClientEmail);

        // this.ClientAdd.controls.AptaraContact.setValue(this.clientData[0].AptaraContact);
        //  this.ClientAdd.controls.AptaraContactEmail.setValue(this.clientData[0].AptaraContactEmail);
        this.checkbox = this.Tasks.filter(task => this.IsTaskCheckBoxChecked(task));
        const selectedTasks = this.checkbox.map(task => task.TaskMasterID);
        this.tmId = selectedTasks.join(",");
        // window.location.href = '/ClientMaster';
      }
    })
  }
  //   getClient(clientId: any){
  //     this.service.getClientbyId(clientId).subscribe({
  //       next: (data: any) => {
  //        this.clientData = data.Data;
  //       this.ClientAdd = new FormGroup({
  //         'ClientId': new FormControl(this.clientId),
  //         'ClientName': new FormControl(this.clientData.ClientName),      
  //         'ClientEmail': new FormControl(this.clientData.ClientEmail),
  //         'AptaraContact':new FormControl(this.clientData.AptaraContact),
  //         'AptaraContactEmail': new FormControl(this.clientData.AptaraContactEmail),
  //         // 'Role': new FormControl(this.SelectedRole),
  //          'ProjectId': new FormControl('')        
  //       })
  //       // this.ClientAdd.controls.ClientName.setValue(this.clientData[0].ClientName);
  //       // this.ClientAdd.controls.ClientEmail.setValue(this.clientData[0].ClientEmail);

  //       // this.ClientAdd.controls.AptaraContact.setValue(this.clientData[0].AptaraContact);
  //       //  this.ClientAdd.controls.AptaraContactEmail.setValue(this.clientData[0].AptaraContactEmail);
  //       this.checkbox = this.Tasks.filter(task => this.IsTaskCheckBoxChecked(task));
  //       const selectedTasks = this.checkbox.map(task => task.TaskMasterID);
  //       this.tmId = selectedTasks.join(",");
  //       // window.location.href = '/ClientMaster';
  //     }
  //   })
  // }

  ProjectIDs: any
  IsTaskCheckBoxChecked(Project: any) {
    if (this.clientData.length !== 0) {
      this.ProjectIDs = this.clientData.ProjectId.split(",");
      return this.ProjectIDs.includes(Project.ProjectId.toString());

    } else {
      return false;
    }
  }

  submitForm() {
    //  this.ClientAdd.controls.ProjectId.setValue(this.tmId);
    if (this.clientId === null) {
      this.ClientAdd.controls.ProjectId.setValue(this.tmId);
      this.service.AddClientDetails(this.ClientAdd.value).subscribe({
        next: (data: any) => {
          debugger
          this.ProjectsData = data.Data;
          const ref = this.dialogService.open(DialogeComponent, {
            header: 'Information',
            width: '300px',
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
      this.ClientAdd.controls.ProjectId.setValue(this.tmId);
      this.service.UpdateClientDetails(this.ClientAdd.value).subscribe({
        next: (data: any) => {
          debugger
          // this.Projects = data;
          this.ProjectsData = data.Data;
          const ref = this.dialogService.open(DialogeComponent, {
            header: 'Information',
            width: '300px',
            data: {
              message: 'Record Updated Succesfully.',
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
      console.log(this.checkbox)
    }
    else {
      this.checkbox.forEach((value, index) => {
        if (value == Project)
          this.checkbox.splice(index, 1)
        console.log(value, Project)
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
