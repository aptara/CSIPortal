import { Component } from '@angular/core';
import { GetQuestionDetailService } from '../get-question-detail.service';

@Component({
  selector: 'app-header-first',
  templateUrl: './header-first.component.html',
  styleUrls: ['./header-first.component.css']
})
export class HeaderFirstComponent {
  constructor(private service:GetQuestionDetailService){

  }
  header :any;
  list:any
ngOnInit(){
  this.service.GetClient(2).subscribe(res => {
    this.header= res
   console.log(this.header.ProjectName) 
   this.header.Data.forEach((Element: any) => {
    console.log(Element.ProjectName)
    this.list=Element.ProjectName
   });
  });
}
}
