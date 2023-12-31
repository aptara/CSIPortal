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
import { ToastModule } from 'primeng/toast';
import { PreviewComponent } from './preview/preview.component';

import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule,DialogService } from 'primeng/dynamicdialog';
import { DialogeComponent } from './dialoge/dialoge.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { ProjectMasterComponent } from './project-master/project-master.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project/add-edit-project.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ForgetPasswardComponent } from './forget-passward/forget-passward.component';

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
    PageNotFoundComponent,
    PreviewComponent,
    DialogeComponent,
    UserMasterComponent,
    ClientMasterComponent,
    ProjectMasterComponent,
    AddUserComponent,
    SidebarComponent,
    UpdateUserComponent,
    AddEditProjectComponent,
    AddClientComponent,
    ForgetPasswardComponent
 
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
    TableModule,
    ToastModule,
    DialogModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  providers: [LogindataService,workbench,FilterClientListService,MessageService, DialogService],
  bootstrap: [AppComponent],
 
  
  entryComponents: [DialogeComponent],

})
export class AppModule { }
