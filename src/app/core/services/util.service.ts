import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    public verificationLogin = new BehaviorSubject(false);
    public checkLoggedIn = this.verificationLogin.asObservable();

    constructor() { }

    changeVerification(check: boolean) {
        this.verificationLogin.next(check);
    }
}
