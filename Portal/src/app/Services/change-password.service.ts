import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private httpClient: HttpClient) { }
  apiurl=environment.baseUrl;
  private ChangePassurl=this.apiurl+'ChangePassword/ChangePassword';
  submitModalData(formData:any){
    const body = { formData };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.ChangePassurl, formData, { headers: headers });
  }
}
