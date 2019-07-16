import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, ErrorInterceptor, CovalentModule } from './interceptors';
import { AuthGuard } from './services/auth.guard';
import { NotAuthGuard } from './services';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { UtilService } from './services/util.service';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, CovalentModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    AuthGuard,
    NotAuthGuard,
    StorageService,
    UserService,
    UtilService,
    ProductService,
  ]
})
export class CoreModule { }
