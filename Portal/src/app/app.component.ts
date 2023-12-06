import { Component } from '@angular/core';
import { GetQuestionDetailService } from './get-question-detail.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
constructor(private service:GetQuestionDetailService
  ,private route:ActivatedRoute
  ,private router: Router){}

ngOnInit() {
 
}
}
