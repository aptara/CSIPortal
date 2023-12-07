import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MainComponent } from './main/main.component';
import { HeaderFirstComponent } from './header-first/header-first.component';
import { FilterClientListComponent } from './filter-client-list/filter-client-list.component';
import { MenuReadComponent } from './menu-read/menu-read.component';
import { LoginAppComponent } from './login-app/login-app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ResponceComponent } from './responce/responce.component';
MenuReadComponent
const routes: Routes = [
  { path: 'main/:ClientId', component: MainComponent },
 // { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'editEmp/:UserMasterID', component: EditEmployeeComponent },
  { path: 'AddEmployee', component: AddEmployeeComponent },
  { path: 'workbench', component: WorkbenchComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
//  { path: 'FilterClientList', component: FilterClientListComponent },
  { path: 'HeaderFirst', component: HeaderFirstComponent },
  { path: 'MenuReadComponent/Show/:id', component: MenuReadComponent  },
  {path:'Dashboard', component:FilterClientListComponent},
  {path:'', redirectTo:'/Login',pathMatch:'full'},
  {path:'Login', component:LoginAppComponent},
  {path:'Header', component:HeaderComponent},
  {path:'Footer', component:FooterComponent},
  {path:'ThankYou', component:ThankyouComponent},
  {path:'Responce', component:ResponceComponent}
  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
