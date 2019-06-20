import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { PreferenciasComponent } from './preferencias/preferencias.component';

const routes: Routes = [
  { path: '', component: PreferenciasComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class MaterialsRoutingModule { }
