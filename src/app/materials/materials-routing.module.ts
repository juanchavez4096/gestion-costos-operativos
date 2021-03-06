import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMaterialsComponent } from './list-materials/list-materials.component';
import { AuthGuard } from '../core/services';
import { MaterialComponent } from './material/material.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', component: ListMaterialsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: ':id', component: MaterialComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class MaterialsRoutingModule { }
