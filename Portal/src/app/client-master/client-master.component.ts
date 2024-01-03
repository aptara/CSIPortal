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

  constructor(private clientService: ClientManagementService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private router: Router) {}

  ngOnInit() {
    this.getClient();
  }

  getClient(){
    this.clientService.getClients().subscribe({
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
}