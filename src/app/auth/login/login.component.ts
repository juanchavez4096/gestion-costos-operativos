import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UtilService } from '../../core/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private utilService: UtilService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.utilService.changeVerification(true);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(form: FormGroup) {
    const values = form.value;
    this.loginForm.disable();
    this.userService.authenticate(values.username, values.password).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.auth.setToken(data.token);
      this.router.navigate(['/products']);
    }, error => {
      this.loginForm.enable();
      console.log(error);
    });
  }

}
