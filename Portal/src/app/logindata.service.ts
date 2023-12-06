import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LogindataService {
 
private url='http://localhost:44378/api/newApi'
 headers= new HttpHeaders()
  .set('content-type', 'application/json')
  

constructor(private httpClient: HttpClient) { }

//http://localhost:44378/api/newApi?EmailId=Aptara.admin@aptaracorp.com
getUsers(empEmail:any){
  var req = this.url + "?EmailId=" + empEmail;
  return this.httpClient.get(req);
}


getAllDetail(){
  return this.httpClient.get(this.url); 
}


GetEmpData(UserMasterID:any){
  var req = this.url + "?UserMasterID=" + UserMasterID;
  return this.httpClient.get(req);
}

updateEmp(UserMasterID:number, emp:any){
  var req = this.url + "?UserMasterID=" + UserMasterID;
  return this.httpClient.put(req,emp,{headers:this.headers});
}

//for add new user
createUser(User:any) {
  var req=this.url;
  return this.httpClient.post(req,User,{headers:this.headers});
}

SendEmail(email:string ){
  var req = this.url + "?EmailId=" + email;
  return this.httpClient.post(req,email);
}








 


}
