import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HttpClientModule  } from '@angular/common/http';
import { LogindataService } from './logindata.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { workbench } from './workbench.Model';
import { CommonModule } from '@angular/common';
import { WorkbenchComponent } from './workbench/workbench.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { CollapseMenusComponent } from './collapse-menus/collapse-menus.component';
import { MainComponent } from './main/main.component';
import { HeaderFirstComponent } from './header-first/header-first.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseBodyComponent } from './collapse-body/collapse-body.component';
import { PhoenixListingComponent } from './phoenix-listing/phoenix-listing.component';
import { FilterClientListComponent } from './filter-client-list/filter-client-list.component';
import { FilterClientListService } from './filter-client-list/filter-client-list.service';
import { GetQuestionDetailService } from './get-question-detail.service';
import { MenuReadComponent } from './menu-read/menu-read.component';
import { LoginAppComponent } from './login-app/login-app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ResponceComponent } from './responce/responce.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ButtonModule} from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import {CardModule} from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
PrimeIcons
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    WelcomeComponent,
    WorkbenchComponent,
    ResetpasswordComponent,
    CollapseMenusComponent,
    MainComponent,
    HeaderFirstComponent,
    CollapseBodyComponent,
    PhoenixListingComponent,
    FilterClientListComponent,
    MenuReadComponent,
    LoginAppComponent,
    HeaderComponent,
    FooterComponent,
    ThankyouComponent,
    ResponceComponent,
    PageNotFoundComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    TableModule
    
  ],
  providers: [LogindataService,workbench,FilterClientListService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
