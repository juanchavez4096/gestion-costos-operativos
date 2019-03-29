import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

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
    location.reload(true);
  }
}
