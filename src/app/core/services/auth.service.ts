import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


export const STORAGE_KEY = 'ingreso-egreso-jwt';
export const FIELD_NAME_USER_EMAIL = 'email';
export const FIELD_NAME_USER_DISPLAY = 'nombre';
export const FIELD_NAME_USER_ROLE_ID = 'rol';

@Injectable()
export class AuthService {

  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private storageService: StorageService, private http: HttpClient) {
  }

  logout() {    
    this.saveStateAndCleanResorces();
    //this.destroy$.next(true);
    //this.destroy$.unsubscribe();
    this.router.navigate(['/login']);
  }

  saveStateAndCleanResorces() {
    sessionStorage.clear();
    localStorage.clear();
  }

  setUserData() {
    this.http.get(`${environment.GET_USERS}/currentUser`).pipe(takeUntil(this.destroy$)).subscribe((user: any) => {
      this.storageService.setItemStorage(user.nombre, FIELD_NAME_USER_DISPLAY, true);
      this.storageService.setItemStorage(user.email, FIELD_NAME_USER_EMAIL, true);
      this.storageService.setItemStorage(user.tipoUsuario.tipoUsuarioId, FIELD_NAME_USER_ROLE_ID, true);
    });
  }

  setToken(token: string) {
    this.storageService.setItemStorage(token, STORAGE_KEY, true);
    this.setUserData();
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  /** Returns the token of the user */
  getToken(parse = false) {
    return this.storageService.getItemStorage(STORAGE_KEY, parse, true);
  }

  /** Returns the username (usually email) of the current user*/
  getUserEmail() {
    return this.storageService.getItemStorage(FIELD_NAME_USER_EMAIL, true, true);

  }

  /** Returns the user's role ID*/
  getUserRoleId() {
    return this.storageService.getItemStorage(FIELD_NAME_USER_ROLE_ID, true, true);

  }

  /** Returns the user's display name */
  getUserDisplayName() {
    return this.storageService.getItemStorage(FIELD_NAME_USER_DISPLAY, true, true);

  }


}
