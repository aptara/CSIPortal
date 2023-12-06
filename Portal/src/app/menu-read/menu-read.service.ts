import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuReadService {
  private url3='http://localhost:62220/api/GetClient/GetClientFeedback'
  constructor(private httpClient: HttpClient) { }
  getClientFeedback(clientId:any){
    const body = { clientId };    
    // Set Content-Type header to application/json
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url3, body, { headers: headers });
  }
}
