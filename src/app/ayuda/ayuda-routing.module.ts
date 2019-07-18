import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { AyudaComponent } from './ayuda/ayuda.component';

const routes: Routes = [
  { path: '', component: AyudaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class AyudaRoutingModule { }
