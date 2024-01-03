import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectMasterService } from './project-master.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-master',
  templateUrl: './project-master.component.html',
  styleUrls: ['./project-master.component.css']
})
export class ProjectMasterComponent {

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

  constructor(private service: ProjectMasterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private ActivatedRoute: ActivatedRoute) {
    this.projectMasterData = this.fb.group({
      ProjectId: [this.projectId],
      ProjectName: [''],
      ClientName: [''],
      ClientId: ['']
    });
  }

  onSort(event: any) {
    this.sortField = event.field;
    this.sortOrder = event.order
  }

  GetProjectMasterDetail() {
    this.service.GetProjectMasterDetails().subscribe({
      next: (response: any) => {
        // Handle the API response here
        this.Project = response.Data
        // console.log(this.Project.ProjectName)
        // this.Project.forEach((element: any) => {
        // this.projectName = element.ProjectName;
        //   //console.log(projectName)
        // });
      }
    });
  }

  ngOnInit() {
    this.GetProjectMasterDetail();
  }

  DeleteProject(ProjectId: any) {
    // Display a confirmation dialog
    const ref = this.dialogService.open(DialogeComponent, {
      header: 'Information',
    
      data: {
        message: 'Are you sure you want to delete this Record?',
      },
    });

    // Check if the user confirmed
    if (ref) {
      ref.onClose.subscribe((confirmed: boolean) => {
        this.service.DeleteProjectMasterDetails(ProjectId).subscribe((data: any) => {
          if (data != null) {
            const ref = this.dialogService.open(DialogeComponent, {
              header: 'Information',
         
              data: {
                message: 'Record Deleted Successfully',
              },
            });
          } else {
            const ref = this.dialogService.open(DialogeComponent, {
              header: 'Information',
            
              data: {
                message: 'Record is not deleted',
              },
            });
          }
          this.ngOnInit();
        });

      });
    }
  }
  EnanbleUser(projectId:any){
this.service.EnableProject(projectId).subscribe(res=>{
  const ref = this.dialogService.open(DialogeComponent, {
    header: 'Information',
    
    data: {
      message: 'Record is Enabled',
    },
  });

this.ngOnInit()
})
  }
}