import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  authenticate(email: string, password: string) {
    return this.http.post(`${environment.GET_USERS}/login`, { email, password }).pipe(map(this.extractData));
  }

  private getHeaders() {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  private extractData(res) {
    const body = res;
    return body;
  }
}
