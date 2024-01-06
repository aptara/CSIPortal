import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectMasterService } from './project-master.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from '../dialoge/dialoge.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-project-master',
  templateUrl: './project-master.component.html',
  styleUrls: ['./project-master.component.css'],
  providers: [ConfirmationService, MessageService]
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
  isChecked: boolean = false;
  isIncludeDeleted: any;

  constructor(private service: ProjectMasterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private ActivatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,) {
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

  GetProjectMasterDetail(isDeleted: any) {
    this.service.GetProjectMasterDetails(isDeleted).subscribe({
      next: (response: any) => {
        // Handle the API response here
        this.Project = response.Data
         console.log(this.Project)
        // this.Project.forEach((element: any) => {
        // this.projectName = element.ProjectName;
        //   //console.log(projectName)
        // });
      }
    });
  }

  ngOnInit() {
    this.GetProjectMasterDetail(this.isIncludeDeleted);
  }

  DeleteProject(ProjectId: any,event:Event) {
    
        
          this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",
      
            accept: () => {
                // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
                this.service.DeleteProjectMasterDetails(ProjectId).subscribe((data: any) => {
                const ref = this.dialogService.open(DialogeComponent, {
                  header: 'Information',
                
                  data: {
                    message: 'Record updated Succesfully.',
                  },
                });
                ref.onClose.subscribe((confirmed: boolean) => {
                 
                  window.location.href = '/ProjectDashboard';
                })
              })
             
            },
         
            reject: () => {
                // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
        }
      
  
  EnanbleUser(projectId:any,event:Event){

  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptButtonStyleClass:"p-button-danger p-button-text",
    rejectButtonStyleClass:"p-button-text p-button-text",
    acceptIcon:"none",
    rejectIcon:"none",

    accept: () => {
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.service.EnableProject(projectId).subscribe(res=>{
        const ref = this.dialogService.open(DialogeComponent, {
          header: 'Information',
        
          data: {
            message: 'Record updated Succesfully.',
          },
        });
        ref.onClose.subscribe((confirmed: boolean) => {
         
          window.location.href = '/ProjectDashboard';
        })
      })
     
    },
 
    reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    }
});
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