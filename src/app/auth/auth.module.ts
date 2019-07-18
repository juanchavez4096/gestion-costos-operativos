import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './dependencies/material.module';
import { ForgotPasswordComponent } from './forgot-password';

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AuthModule { }
