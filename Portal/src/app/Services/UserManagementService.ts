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
  private url2 = this.apiurl + 'UserManagement/GetUserInfo';
  private url3 = this.apiurl + 'UserManagement/GetUserDetailById';
  private url4 = this.apiurl + 'UserManagement/UpdateUser';
  private url5 = this.apiurl + 'UserManagement/DeleteUser/';
  
  GetRole() {
    return this.httpClient.get(this.url)
  }

  AddUserDetail(UserDetail: any) {
    debugger
    const body = { UserDetail }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url1, UserDetail,{headers:headers})
  }

  UpdateUser(UserDetail: any) {
    debugger
    const body = { UserDetail }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url4, UserDetail,{headers:headers})
  }
  GetUserDetail() {
  
    return this.httpClient.get(this.url2)
  }

  GetUserbyId(UserMasterID: any) {
    debugger
    const body = { UserMasterID }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url3, body,{headers:headers})
  }

  DeleteUser(UserMasterID: any) {
    debugger
    return this.httpClient.delete(this.url5 + UserMasterID)
  }
}