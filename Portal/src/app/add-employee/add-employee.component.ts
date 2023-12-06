import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LogindataService } from '../logindata.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
AddEmployee:FormGroup|any;
constructor(private service:LogindataService){}
ngOnInit(){
var CreatedDate = new Date()
console.log(CreatedDate)
 this.AddEmployee= new FormGroup({
   'ClientMasterID': new FormControl(null,Validators.required),
    'CreatedBy' : new FormControl(null,Validators.required),
    'CreatedOn' : new FormControl(null,Validators.required),
    'EmailId' : new FormControl(null,Validators.required),
    'Password' : new FormControl(null,Validators.required),
    'FirstName' : new FormControl(null,Validators.required),
    'LastName' : new FormControl(null,Validators.required)
    
  }) 
}
onsubmit(){
   //console.log(this.AddEmployee.value)
    this.service.createUser(this.AddEmployee.value).subscribe(res => {
      
      if (res != null) {

        alert("New User Created Succsefully")
        window.location.href='/welcome';

      }
      else {
        alert("User  is invalid")
      }
    });
  }
  }
