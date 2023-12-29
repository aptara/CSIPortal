import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment';

@Injectable({
  providedIn: 'root'
})
export class ClientManagementService {

  constructor(private httpClient: HttpClient) { }
  apiurl=environment.baseUrl;
  private getClientUrl=this.apiurl+'GetClient/GetClientList';
  private addClientUrl=this.apiurl+'ClientManagement/AddClientInfo';
  private getClientByIdUrl=this.apiurl+'ClientManagement/GetClient';
  private updateClientUrl=this.apiurl+'ClientManagement/UpdateClientInfo';

  getClients(){
    const body  ={}
    debugger
    return this.httpClient.post(this.getClientUrl,body); 
  }

  getClientbyId(clientId: any){
    const body  ={clientId}
    debugger
    return this.httpClient.post(this.getClientByIdUrl,body); 
  }

  AddClientDetails(UserDetail: any) {
    debugger
    const body = { UserDetail }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.addClientUrl, UserDetail,{headers:headers})
  }

  UpdateClientDetails(UserDetail: any) {
    debugger
    const body = { UserDetail }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.updateClientUrl, UserDetail,{headers:headers})
  }
}
