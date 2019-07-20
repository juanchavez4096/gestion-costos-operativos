import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthService, UserService } from '../../core/services';
import { HttpEventType } from '@angular/common/http';
import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  public userForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public progress = 0;
  public tipos = [
    {
      tipoId: 1,
      tipo: 'Administrador'
    },
    {
      tipoId: 2,
      tipo: 'Usuario'
    }
  ];

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      tipoUsuario: ['', Validators.required],
      imagen: ['']
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const values = form.value;
    this.userForm.disable();
    let formData: FormData = new FormData();
    formData.append('nombre', values.nombre);
    formData.append('email', values.email);
    formData.append('tipoUsuario', values.tipoUsuario);
    formData.append('imagen', values.imagen);
    this._loadingService.register('replaceTemplateSyntax');
    this.userService.addUser(formData).pipe(takeUntil(this.destroy$)).subscribe(event => {
      if ( event.type === HttpEventType.UploadProgress ) {
        this.progress = Math.round((100 * event.loaded) / event.total);
        this._loadingService.setValue('replaceTemplateSyntax', this.progress);
      }
      if ( event.type === HttpEventType.Response ) {
        console.log(event.body);
        this.userForm.reset();
        this.progress = 0;
        this._loadingService.resolve('replaceTemplateSyntax')
        this.router.navigate(['/administration']);
      }
      
    }, error => {
      this.userForm.enable();
      this.progress = 0;
      this._loadingService.resolve('replaceTemplateSyntax')
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
      console.log(error);
    });
  }

}
