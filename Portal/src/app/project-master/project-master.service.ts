import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectMasterService {

  apiurl = environment.baseUrl;
  private url = this.apiurl + 'GetProject/GetProjectDetails';
  private AddProjectURL = this.apiurl + 'GetProject/AddProjectDetails';
  private UpdateProjectURL = this.apiurl + 'GetProject/UpdateProjectDetails';
  private DeleteProjectURL = this.apiurl + 'GetProject/DeleteProjectDetails/';
  private GetProjectByIdURL = this.apiurl + 'GetProject/GetProjectDetailsById/';

  constructor(private httpClient: HttpClient) { }

  GetProjectMasterDetails() {
    return this.httpClient.get(this.url);
  }

  AddProjectMasterDetails(formData: any) {
    const body = { formData };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.AddProjectURL, formData);
  }
  
  
  UpdateProjectMasterDetails(formData: any) {
    const body = { formData };
    return this.httpClient.post(this.UpdateProjectURL, formData);
  }

  DeleteProjectMasterDetails(ProjectId : any) {
    return this.httpClient.delete(this.DeleteProjectURL + ProjectId);
  }

  GetProjectMasterDetailsById(ProjectId : any) {
    return this.httpClient.get(this.GetProjectByIdURL + ProjectId);
  }
  
}
