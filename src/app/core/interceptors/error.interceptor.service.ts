import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TdDialogService } from '@covalent/core/dialogs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private _dialogService: TdDialogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(true);
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 0) {
        this._dialogService.openAlert({
          message: 'Puede que el servidor no esté levantado, levantelo y pruebe de nuevo.',
          disableClose: false, // defaults to false
          //viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Error', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
        console.log('Check Your Internet Connection And Try again Later');
      } else if (err instanceof HttpErrorResponse && err.status === 401) {
        // auto logout if 401 response returned from api
        this.cleanResourceAndLogout();
      }

      return throwError(err);
    }));
  }

  cleanResourceAndLogout() {
    this.authService.logout();
  }
}
