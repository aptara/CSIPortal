import { Component } from '@angular/core';
import { ClientManagementService } from '../Services/client-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  styleUrls: ['./client-master.component.css']
})
export class ClientMasterComponent {
  clients: any[] = [];

  constructor(private clientService: ClientManagementService,
    private router: Router) {}

  ngOnInit() {
    this.getClient();
  }

  getClient(){
    this.clientService.getClients().subscribe({
      next: (data: any) => {
       this.clients = data.Data;
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

  // deleteUser(user: any) {
  //   // Implement delete functionality
  //   console.log('Delete user:', user);
  // }
}