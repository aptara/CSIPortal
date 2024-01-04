import { Component } from '@angular/core';
import { GetQuestionDetailService } from './get-question-detail.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserManagement } from './Services/UserManagementService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  Client : any=[]
  FirstName:any;
  storedFirstName:any=[]
  LoggedUserName:any
  RoleId:any
hideHeaderOnPrint= false;
constructor(private service:GetQuestionDetailService
  ,private route:ActivatedRoute
  ,public router: Router
  ,private UserManagement: UserManagement ){
    this.hideHeaderOnPrint = this.router.url.includes('/Feedback/');
  }
  ngOnInit() {
  this.initializeUserData()

  }
  initializeUserData() {
    this.storedFirstName = localStorage.getItem('loginDetails');
  console.log(typeof(this.storedFirstName))
    // Check if the value is not null before parsing
    if (this.storedFirstName !== null) {
      this.FirstName = JSON.parse(this.storedFirstName);
      console.log(this.FirstName);
  
      // Use the Safe Navigation Operator to handle potential null or undefined values
      this.LoggedUserName = this.FirstName?.FirstName;
      this.RoleId = this.FirstName[0]?.RoleId;
      console.log(this.RoleId)
    
    }
  }
  
  showSidebar(): boolean {
    const url = this.router.url;
  
    // Check if RoleId is 0 or 1 for either this.Client[0] or this.Client[1]
    const isRoleId0Or1 = (this.RoleId !== 3) 
                        
  
    return (
      isRoleId0Or1 &&
      !url.startsWith('/UserDashboard/') &&
      url !== '/Login' &&
      !url.startsWith('/SubmittedResponse') &&
      !url.startsWith('/BadResponse') &&
      !url.startsWith('/Feedback/') &&
      !url.startsWith('/ThankYou') &&
      !url.startsWith('/ForgetPassward')
    );
  }
  
}
