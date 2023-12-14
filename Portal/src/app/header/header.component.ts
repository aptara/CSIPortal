import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
FirstName:any;
storedFirstName:any=[]
LoggedUserName:any
SirName:any
ngOnInit(){
   this.storedFirstName = localStorage.getItem('loginDetails');

  // Check if the value is not null before parsing
  if (this.storedFirstName !== null) {
    this.FirstName = JSON.parse(this.storedFirstName);
    console.log(this.FirstName[0].FirstName);
    this.LoggedUserName = this.FirstName[0].FirstName;
    this.SirName = this.FirstName[0].LastName;
  }
}



}
