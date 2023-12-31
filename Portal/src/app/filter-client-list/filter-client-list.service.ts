import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment';
@Injectable({
  providedIn: 'root'
})
export class FilterClientListService {
  // private url='http://localhost:62220/api/GetClient/GetClientList';
  // private url2='http://localhost:62220/api/GetClient/GetClientDetailsList'
  
  constructor(private httpClient: HttpClient) { }
  apiurl=environment.baseUrl;
  private url=this.apiurl+'GetClient/GetClientList';
  private url2=this.apiurl+'GetClient/GetClientDetailsList';
  private url3=this.apiurl+'GenerateLink/GenerateLink';
  private url4 = this.apiurl +'GetProject/GetProject';
  private url5 = this.apiurl +'GetProject/GetProjectDetails';
  private resendUrl=this.apiurl+'GenerateLink/GenerateResendLink';
  
  getClientList(RoleId:any,UserMasterID:any){
    const body  ={RoleId,UserMasterID}
    debugger
    return this.httpClient.post(this.url,body);     
  }
  getClientDetails(fromDate: any, toDate: any, ProjectId:any, ClientId: any){
    // let params = new HttpParams()
    //   .set('startDate', startDate)
    //   .set('endDate', endDate)
    //   .set('clientId', clientId);
    // this.url=`http://localhost:62220/api/GetClient/GetClientDetailsList?startDate=${startDate}&endDate=${endDate}&clientId=${clientId}`;
    const body = { fromDate, toDate,  ProjectId,ClientId };
    // Set Content-Type header to application/json
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url2, body, { headers: headers });
  }

  GetProject(ClientId: any,RoleId:any,UserMasterID:any) {
    debugger
    const body = { ClientId,RoleId,UserMasterID };
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url4, body,{ headers: headers});
  }


  
  submitModalData(formData:any){
    const body = { formData };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url3, formData);
  }

  GetProjectMasterDetails(IsIncludeDeleted: any) {
    const body = { IsIncludeDeleted };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url5,body,{headers:headers});
  }

  submitResendData(client:any){
    const body = { client };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.resendUrl, client);
  }
}
