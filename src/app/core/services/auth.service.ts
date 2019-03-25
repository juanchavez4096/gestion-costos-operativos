import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';


export const STORAGE_KEY = 'ingreso-egreso-jwt';
export const FIELD_NAME_USER_EMAIL = 'email';
export const FIELD_NAME_USER_DISPLAY = 'nombre';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private storageService: StorageService) { }



  logout() {
    this.saveStateAndCleanResorces();
    this.router.navigate(['/login']);
  }

  saveStateAndCleanResorces() {
    sessionStorage.clear();
    localStorage.clear();
  }

  setToken(token: string) {
    this.storageService.setItemStorage(token, STORAGE_KEY, true);
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
    return this.getValue(FIELD_NAME_USER_EMAIL);
  }

  /** Returns the user's display name */
  getUserDisplayName() {
    return this.getValue(FIELD_NAME_USER_DISPLAY);
  }

  getValue(field: string): string {
    let returnValue = null;
    if (this.storageService.checkItemStorage(STORAGE_KEY, true)) {
      const separateToken = this.getToken(true).split('.');
      if (separateToken.length === 3) {
        const dataToken = JSON.parse(atob(separateToken[1]));
        try {
          returnValue = Object.keys(dataToken).filter(key => key === field).length > 0 ? dataToken[field] : null;
        } catch (err) {
          this.logout();
        }
      }
    }

    if (returnValue == null && this.router.url !== '/login') {
      this.logout();
    }

    return returnValue;
  }
}
