import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService,  UtilService } from '../../core/services';
import { takeUntil } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core/dialogs';
import { Router } from '@angular/router';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  @Input() public showChangePassword: boolean;
  @Output() public updateShowCP = new EventEmitter<any>();

  public resetPassword: FormGroup;
  public changeForgottenPassword: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public inicio = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _dialogService: TdDialogService,
    private router: Router) {
    this.resetPassword = this.fb.group({
      email: ['', Validators.email]
    });
    this.changeForgottenPassword = this.fb.group({
      email: ['', Validators.email],
      codigoVerificacion: [''],
      password: [''],
      passwordRepeated: ['']

    }, { validator: this.passwordValidation('password', 'passwordRepeated') });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  goBack() {
    
    this.router.navigate(['/login'])
    
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const values = form.value;
    this.userService.forgotPassword(values.email).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this._dialogService.openAlert({
          message: 'Se enviará un código de verificación a su correo para recuperar la contraseña',
          disableClose: false, // defaults to false
          //viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Codigo de recuperación', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
        this.changeForgottenPassword.get('email').setValue(values.email);
        this.resetPassword.reset();
        this.changeInicio();
      }
    }, error => {
      if (error.error.status === 409) {
        this._dialogService.openAlert({
          message: error.error.message,
          disableClose: false, // defaults to false
          //viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Error', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      }
    });

  }

  onSubmitChangeForgottenPassword(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    const values = form.value;
    this.userService.changeForgottenPassword(values.email, values.codigoVerificacion, values.password).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this._dialogService.openAlert({
          message: 'Contraseña cambiada correctamente, inicie sesión para ver los cambios',
          disableClose: false, // defaults to false
          //viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Cambio de contraseña', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
        this.resetPassword.reset();
        this.goBack();
      }
    }, error => {
      if (error.error.status === 409) {
        this._dialogService.openAlert({
          message: error.error.message,
          disableClose: false, // defaults to false
          //viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Error', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      }
    });

  }

  changeInicio(){
    this.inicio = !this.inicio;
  }

  passwordValidation(password: string, passwordRepeated: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[password];
      let t = group.controls[passwordRepeated];
      if (f.value !== t.value) {
        return {
          password: "La contraseña debe coincidir con la contraseña repetida."
        };
      }
      return {};
    }
  }
}

