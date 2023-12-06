import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterClientListService {
  private url='http://localhost:62220/api/GetClient/GetClientList';
  private url2='http://localhost:62220/api/GetClient/GetClientDetailsList'
  constructor(private httpClient: HttpClient) { }

  getClientList(){
    return this.httpClient.get(this.url);     
  }
  getClientDetails(fromDate: Date, toDate: Date, clientId: any){
    // let params = new HttpParams()
    //   .set('startDate', startDate)
    //   .set('endDate', endDate)
    //   .set('clientId', clientId);
    // this.url=`http://localhost:62220/api/GetClient/GetClientDetailsList?startDate=${startDate}&endDate=${endDate}&clientId=${clientId}`;
    const body = { fromDate, toDate, clientId };
    
    // Set Content-Type header to application/json
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url2, body, { headers: headers });
  }
}
