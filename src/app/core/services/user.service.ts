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

  myEmpresa() {
    return this.http.get(`${environment.GET_EMPRESA}/myEmpresa`).pipe(map(this.extractData));
  }

  updateEmpresaPreferences(preferencias: any) {
    return this.http.put(`${environment.GET_EMPRESA}/changePreferences`, preferencias).pipe(map(this.extractData));
  }

  forgotPassword(email: string){
    return this.http.get(`${environment.GET_USERS}/forgotPassword?email=${email}`).pipe(map(this.extractData));
  }

  changeForgottenPassword(email: string, codigoVerificacion: string, password: string){
    return this.http.get(`${environment.GET_USERS}/changeForgottenPassword?email=${email}&password=${password}&codigoVerificacion=${codigoVerificacion}`).pipe(map(this.extractData));
  }

  addUser(user: FormData) {
    return this.http.post(`${environment.GET_USERS}/add`, user, {reportProgress: true, observe: 'events'});
  }

  getUsers(page: number,search: string) {
    return this.http.get(`${environment.GET_USERS}/all?search=${search}&page=${page}`).pipe(map(this.extractData));
  }

  getUser(userId: number) {
    return this.http.get(`${environment.GET_USERS}/byId?usuarioId=${userId}`).pipe(map(this.extractData));
  }

  changeStatus(userId: number) {
    return this.http.get(`${environment.GET_USERS}/changeStatus?usuarioId=${userId}`);
  }

  updateUser(usuarioId: number, nombre: string, email: string, tipoUsuario: number) {
    return this.http.get(`${environment.GET_USERS}/updateUser?usuarioId=${usuarioId}&nombre=${nombre}&email=${email}&tipoUsuario=${tipoUsuario}`);
  }

  uploadImage(user: FormData) {
    return this.http.post(`${environment.GET_USERS}/file/upload`, user, {reportProgress: true, observe: 'events'});
  }

  deleteImage() {
    return this.http.delete(`${environment.GET_USERS}/file/delete`);
  }

  private getHeaders() {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  private extractData(res) {
    const body = res;
    return body;
  }
}
