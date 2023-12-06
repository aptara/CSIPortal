import { Component } from '@angular/core';
import { workbench } from '../workbench.Model';
@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent {
workbench=new workbench()
DataArray:any=[];

ngOnInit(){
  this.DataArray.push(this.workbench)
}
addForm(){
  this.workbench = new workbench()
  this.DataArray.push(this.workbench)
}

delForm(index:any){
this.DataArray.splice(index)
}

onSubmit(){
  console.log(this.DataArray)
}
}
