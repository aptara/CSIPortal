import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  CurrentDate :any;
  ngOnInit(){
    this.CurrentDate = new Date().getFullYear();
  }

}
