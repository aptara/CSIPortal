import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditProjectRoutingModule } from './add-edit-project-routing.module';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import {CardModule} from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule,DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    AddEditProjectRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    TableModule,
    ToastModule,
    DialogModule,
    DynamicDialogModule,
  ]
})
export class AddEditProjectModule { }
