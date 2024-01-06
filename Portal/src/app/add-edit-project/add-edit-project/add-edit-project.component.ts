import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectMasterService } from 'src/app/project-master/project-master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogeComponent } from 'src/app/dialoge/dialoge.component';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.css']
})
export class AddEditProjectComponent {
  projectMasterData: FormGroup | any;
  sortField: any;
  sortOrder: any;
  ClientForLink: any
  projectId: any;
  RoleId: any;
  Role: any;
  UserMasterID: any;
  Project: any = [];
  projectNameList: any = []
  newProjects: any[] = [];
  modalTitle: string = 'Add New Record';
  data: any;
  public mode: any = 'Add';
  private sub: any;
  storedFirstName:any;
  StoredData:any;
  UsermasterId:any
  constructor(private service: ProjectMasterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private ActivatedRoute: ActivatedRoute) {
    this.projectMasterData = this.fb.group({
      ProjectId: [this.projectId],
      ProjectName: ['', Validators.required],  // ProjectName is now required
      ClientName: [''],   // ClientName is now required
      ClientId: [''],
      CreatedBy:[''],
      LastUpdatedBy:['']
    });
  }

  ngOnInit(): void {
    this.sub = this.ActivatedRoute.paramMap.subscribe(params => {
      this.projectMasterData.controls['ProjectId'].setValue(params.get('id'));
      if (this.projectMasterData.controls['ProjectId'].value > 0) {
        this.GetProjectDetailsById(this.projectMasterData.controls['ProjectId'].value);
        this.mode = "Edit";
      }
    });
    this.GetLocalStorageDataForId();
  }

  GetLocalStorageDataForId(){
    this.storedFirstName = localStorage.getItem('loginDetails');

    // Check if the value is not null before parsing
    if (this.storedFirstName !== null) {
      this.StoredData = JSON.parse(this.storedFirstName);
    // alert(this.StoredData[0].UserMasterID);
      this.UsermasterId = this.StoredData[0].UserMasterID;
    }
  }
  OnSubmit() {
    if (this.mode == "Add") {
      if (this.projectMasterData.valid) {
        this.projectMasterData.controls['CreatedBy'].setValue(this.UsermasterId)
        debugger
        console.log(this.projectMasterData.value);
        this.projectMasterData.ClientId = 0;
        
        this.service.AddProjectMasterDetails(this.projectMasterData.value).subscribe({
          next: (data: any) => {
            this.projectNameList = data.Data;
            const ref = this.dialogService.open(DialogeComponent, {
              header: 'Information',
           
              data: {
                message: 'Record saved Succesfully.',
              },
            });
            ref.onClose.subscribe((confirmed: boolean) => {
              window.location.href = '/ProjectDashboard';
            })
          },
          error: (error: any) => {
            console.error('Error submitting form:', error);
          }
        });
      }
    }
    else {
      if (this.projectMasterData.valid) {
        this.projectMasterData.controls['LastUpdatedBy'].setValue(this.UsermasterId)
        //this.projectMasterData.controls.ProjectId.setValue(this.data.Data.ProjectId);
        this.service.UpdateProjectMasterDetails(this.projectMasterData.value).subscribe((data: any) => {
          if (data != null) {
            const ref = this.dialogService.open(DialogeComponent, {
              header: 'Information',
              width: '300px',
              data: {
                message: 'Record updated Succesfully.',
              },
            });
            ref.onClose.subscribe((confirmed: boolean) => {
              window.location.href = '/ProjectDashboard';
            })
          } else {
            const ref = this.dialogService.open(DialogeComponent, {
              header: 'Information',
              width: '300px',
              data: {
                message: 'Record is not updated.',
              },
            });
          }
        });
      }
    }
  }

  private showSuccessDialog(): void {
    const ref = this.dialogService.open(DialogeComponent, {
      header: 'Information',
      width: '300px',
      data: {
        message: 'Record Added Succesfully.',
      },
    });

    ref.onClose.subscribe(() => {
      // Handle dialog closed event if needed
    });
  }

  GetProjectDetailsById(projectId: any) {
    this.projectId = projectId;
    this.service.GetProjectMasterDetailsById(this.projectId).subscribe(res => {
      this.data = res;
      this.projectMasterData.controls.ProjectId.setValue(this.data.Data.ProjectId);
      this.projectMasterData.controls.ProjectName.setValue(this.data.Data.ProjectName);
    });
  }

}
