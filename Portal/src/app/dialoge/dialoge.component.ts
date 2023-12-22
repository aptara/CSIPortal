import { Component, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialoge',
  templateUrl: './dialoge.component.html',
  styleUrls: ['./dialoge.component.css']
})
export class DialogeComponent {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    @Inject(DynamicDialogRef) public dialogRef: DynamicDialogRef
  ) {}

  get data() {
    return this.config.data;
  }
}
