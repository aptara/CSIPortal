import { Component, Input } from '@angular/core';
import { GetQuestionDetailService } from '../get-question-detail.service';

@Component({
  selector: 'app-collapse-body',
  templateUrl: './collapse-body.component.html',
  styleUrls: ['./collapse-body.component.css']
})
export class CollapseBodyComponent {
  @Input() description: string = '';
  constructor(private service:GetQuestionDetailService,){}

  Discription:any=[];
  GetAllDescription:any =[];
  ngOnInit(){
  this.GetDiscription();
  
  }
  GetDiscription(){
    this.service.getAllDetail().subscribe(res => {
       this.Discription = res;
     
      //this.accordianItems.push(this.question.Question)
      //console.log (this.question.QuestionId);
      this.Discription.Data.forEach((element:any) => {
      //  console.log(element.QuestionDescription)
        this.GetAllDescription.push(element.QuestionDescription)
      // console.log("Desc" + JSON.stringify(this.GetAllDescription));
      });
    
    
    });
  }
    
}
