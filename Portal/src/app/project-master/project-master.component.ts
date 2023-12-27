import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterClientListService } from '../filter-client-list/filter-client-list.service';
import { MessageService } from 'primeng/api';

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
  RoleId:any;
  Role:any;
  UserMasterID:any;
  Project:any=[];
  projectName:any=[]

  constructor(private service: FilterClientListService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef) {
    this.projectMasterData = this.fb.group({
      ProjectId: [this.projectId],
      ProjectName: [''],
      ClientName: [''],
      ClientId: [this.ClientForLink]
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

  ngOnInit(){
    this.GetProjectMasterDetail();
  }

  // Add editProject and deleteProject methods
  editProject(client: any) {
    // Add logic to handle edit action
    console.log('Edit project:', client);
  }

  deleteProject(client: any) {
    // Add logic to handle delete action
    console.log('Delete project:', client);
  }
}
