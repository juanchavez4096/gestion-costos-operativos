import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotAuthGuard } from '../core/services/not-auth.guard';
import { ForgotPasswordComponent } from './forgot-password';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    canActivate: [NotAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
