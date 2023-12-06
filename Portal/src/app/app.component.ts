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
ClientId = 2
ngOnInit() {
  // Set the ClientId to 2 (or any desired value)
  const clientId = 2;

  // Use the ClientId in your service or other logic
  this.service.GetClient(clientId).subscribe(res => {
    console.log(res);
  });

  // Navigate to the main route with the specified ClientId
  this.router.navigate(['/main', clientId]);
}
}
