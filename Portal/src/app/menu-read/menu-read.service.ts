import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment';
@Injectable({
  providedIn: 'root'
})
export class MenuReadService {
  // private url3='http://localhost:62220/api/GetClient/GetClientFeedback'
  constructor(private httpClient: HttpClient) { }
  apiurl=environment.baseUrl;
  private url3=this.apiurl+'GetClient/GetClientFeedback'
  getClientFeedback(clientId:any){
    const body = { clientId };    
    // Set Content-Type header to application/json
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url3, body, { headers: headers });
  }
}
