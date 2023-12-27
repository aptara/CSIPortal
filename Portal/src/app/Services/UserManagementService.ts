import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserManagement {
  constructor(private httpClient: HttpClient) { }
  apiurl = environment.baseUrl;
  private url = this.apiurl + 'UserManagement/GetRole';
  private url1 = this.apiurl + 'UserManagement/AddUserInfo';
  GetRole() {
    return this.httpClient.get(this.url)
  }

  AddUserDetail(UserDetail: any) {
    debugger
    const body = { UserDetail }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url1, UserDetail,{headers:headers})
  }
}