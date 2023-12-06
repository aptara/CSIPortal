import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../Environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAppService {

  constructor(private httpClient: HttpClient, private router:Router) { }

  apiurl=environment.baseUrl;

  //Get Client by Id
  private GetUserMasterDetailUrl = this.apiurl +'UserLogin/GetUserLoginDetails';
  GetUsermasterDetails(Detail:any){
    var req=this.GetUserMasterDetailUrl;
    return this.httpClient.post(req,Detail);
  }
}
