import { Component } from '@angular/core';
import { LogindataService } from '../logindata.service';
import { FormGroup,FormControl ,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  providers:[DatePipe]
})


export class EditEmployeeComponent {
 
  CreatedOnDate:any;
constructor(private service:LogindataService,private router:ActivatedRoute,private datePipe:DatePipe){}
update:FormGroup|any;
currentUser:any;
UserID:any;
dateArray:any=[];
   ngOnInit(){
  this.update= new FormGroup({
    'ClientMasterID' :new FormControl({value:"",disabled:true},Validators.required),
    'CreatedBy' : new FormControl({value:"",disabled:true},Validators.required),
    'CreatedOn' : new FormControl({value:"",disabled:true},Validators.required),
    'UserMasterID' : new FormControl({value:"",disabled:true},Validators.required),
    'StatusID' : new FormControl({value:"",disabled:true},Validators.required),
    'EmailId' : new FormControl(null,Validators.required),
    'Password' : new FormControl({value:"",disabled:true},Validators.required),
    'FailedLoginAttempts' : new FormControl({value:"",disabled:true},Validators.required),
    'LastLoggedIn' : new FormControl({value:"",disabled:true},Validators.required),
    'FirstName' : new FormControl(null,Validators.required),
    'LastName' : new FormControl(null,Validators.required),
    'LocationId' : new FormControl({value:"",disabled:true},Validators.required),
    'LoginBlockedDateTime' : new FormControl({value:"",disabled:true},Validators.required),
    'OTP' : new FormControl({value:"",disabled:true},Validators.required),
    'OTPAttemptCount' : new FormControl({value:"",disabled:true},Validators.required),
    'OTPExpiryDate' : new FormControl({value:"",disabled:true},Validators.required),
    'OTPGeneratedOn' : new FormControl({value:"",disabled:true},Validators.required),
    'UpdatedBy' : new FormControl({value:"",disabled:true},Validators.required),
    'UpdatedOn' : new FormControl({value:"",disabled:true},Validators.required)
  }) 

   this.UserID = this.router.snapshot.params['UserMasterID']
  this.service.GetEmpData(this.UserID).subscribe((result)=>{
    this.currentUser = result;
    console.log(JSON.stringify(this.currentUser))
  })

setTimeout(() => {
  this.SetAllData();
},2000); 

}

//passing alldata from ID to next component
SetAllData(){
  this.update.setValue(this.currentUser)
  var CreatedOn = this.ConvertDate(this.currentUser.CreatedOn);
  var LastLoggedIn = this.ConvertDate(this.currentUser.LastLoggedIn);
  var UpdatedOn = this.ConvertDate(this.currentUser.UpdatedOn);
  this.update.controls.CreatedOn.setValue(CreatedOn)
  this.update.controls.LastLoggedIn.setValue(LastLoggedIn)
  this.update.controls.UpdatedOn.setValue(UpdatedOn)
}


ConvertDate(dateString:string){
  const date = new Date(dateString)
  var year = date.getFullYear();
  var month = date.getMonth() + 1; 
  var day = date.getDate();
  var dates = year + "-" + month + "-" + day;
return dates;
}


//updating data on clicking edit button
onUpdate(){
  if(confirm("Do you want to update this profile?"))
  {
    this.service.updateEmp(this.UserID,JSON.stringify(this.update.value)).subscribe(res=>{
      console.log(JSON.stringify(res));
     })
    
     setTimeout(() => {
      window.location.href='/welcome';
     }, 1000);
     
  }
 
}
}
