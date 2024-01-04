import { Component } from '@angular/core';
import { ClientManagementService } from '../Services/client-management.service';
import { Router } from '@angular/router';
import { DialogeComponent } from '../dialoge/dialoge.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  styleUrls: ['./client-master.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ClientMasterComponent {
  clients: any[] = [];
  isChecked: boolean = false;
  isIncludeDeleted: any;

  constructor(private clientService: ClientManagementService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private router: Router) {}

  ngOnInit() {
    this.getClient(this.isIncludeDeleted);
  }

  getClient(isDeleted: any){
    this.clientService.getClients(isDeleted).subscribe({
      next: (data: any) => {
       this.clients = data.Data;
       console.log(this.clients)
      //  this.clients.forEach((element: any) => {
      //   this.projectName  = element.ClientId;
      //   // console.log(clientid)
      //  });
      }
    });
  }

  editClient(client: any) {
    // Implement edit functionality
    this.router.navigate(['/AddEditClient'], { queryParams: { clientId: client.ClientId } });
  }

  deleteClient(client: any, event: Event) {
    // this.clientService.DeleteClientDetails(client).subscribe(res => {
    //   const ref = this.dialogService.open(DialogeComponent, {
    //     header: 'Information',
    //     width: '300px',
    //     data: {
    //       message: 'Record updated Succesfully.',
    //     },
    //   });
    //   ref.onClose.subscribe((confirmed: boolean) => {
    //     window.location.href = '/ClientMaster';
    //   })
    // })
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
        this.clientService.DeleteClientDetails(client).subscribe(res => {
          const ref = this.dialogService.open(DialogeComponent, {
            header: 'Information',
            width: '300px',
            data: {
              message: 'Record updated Succesfully.',
            },
          });
          ref.onClose.subscribe((confirmed: boolean) => {
            window.location.href = '/ClientMaster';
          })
        })
      },
      reject: () => {
          // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }

  EnableUser(ClientId:any){
    this.clientService.EnableClient(ClientId).subscribe(res=>{
      console.log(res)
    })
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