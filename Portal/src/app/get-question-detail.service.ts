import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './Environment';
@Injectable({
  providedIn: 'root'
})
export class GetQuestionDetailService {


 // private url='http://localhost:62220/api/GetQuestion/GetQuestionDetail';
  constructor(private httpClient: HttpClient,
     private router:Router){}
    
     
     apiURL = environment.baseUrl;

    url = this.apiURL + 'GetQuestion/GetQuestionDetail'
  getAllDetail(){
    console.log(JSON.stringify(this.httpClient.get(this.url)))
    return this.httpClient.get(this.url); 
    
  }
  
  private PostUrl =this.apiURL +'GetQuestion/PostQuestionDetail'
  PostAllDetail(Detail:any){
    var req=this.PostUrl;
    return this.httpClient.post(req,Detail);
  }
  //Get Client by Id
  private GetClientUrl =this.apiURL +'GetClient/GetClientForTop'
  GetClient(clientId: number){
    const requestData = { ClientId: clientId }; // Assuming your API expects an object with the property 'ClientId'

    return this.httpClient.post(this.GetClientUrl, requestData);
  }

  navigateToMainWithClientId(clientId: number) {
    this.router.navigate(['/main', clientId]);
  }

}


