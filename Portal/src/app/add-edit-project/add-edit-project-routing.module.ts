import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditProjectComponent
  },
  {
    path:'Add',
    component:AddEditProjectComponent
  },
  {
    path:'Update/:id',
    component:AddEditProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditProjectRoutingModule { }
