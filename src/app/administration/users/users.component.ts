import { Component, OnInit, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService, UserService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core/dialogs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UploadUserImagesComponent } from '../../shared/components/upload-user-images/upload-user-images.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  url;
  pageSize: number = 0;
  total: number = 0;
  public userForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  user: any;
  empresa: any;
  userImageLoadedVar = false;
  
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
    public auth: AuthService,
    public route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService) {
    this.userForm = this.fb.group({
      nombre: [''],
      email: ['', Validators.email],
      tipoUsuario: ['']
    });

  }

  ngOnInit() {
    this.route.url.subscribe(a => {
      this.getUser();      
    })
  }

  

  getPerfilUserId(){
    let token = this.auth.getToken(true).split('.');
    let userId;
    if (token.length === 3) {
      const dataToken = JSON.parse(atob(token[1]));
      try {
        userId = Object.keys(dataToken).filter(key => key === 'sub').length > 0 ? dataToken['sub'] : null;
      } catch (err) {

      }
    }
    return userId;
  }
 

  getUser() {
    this.userService.myEmpresa().subscribe(empresa => {
      this.empresa = empresa;
      let userId;
      if (this.router.url === '/administration/perfil') {
        userId = this.getPerfilUserId();
      }else{
        userId = this.route.snapshot.params.id;
      }
      this.userService.getUser(userId).subscribe(user => {
        this.user = user;
        if (this.user == null) {
          this.router.navigate(['/administration']);
        } else {
          this.url = 'http://localhost:8081/api/usuario/file/download?a=' + Math.random() + '&token=' + this.auth.getToken(true) + '&usuarioId=' + this.user.usuarioId + '&size=500x500';
          if (this.user.email === this.auth.getUserEmail()) {
            console.log(this.userForm.get('nombre').validator)
            this.userForm.get('nombre').setValidators(Validators.required);
            this.userForm.get('email').setValidators(Validators.required);
          }
          this.userForm.get('nombre').setValue(user.nombre);
          this.userForm.get('email').setValue(user.email);
          this.userForm.get('tipoUsuario').setValue(user.tipoUsuario.tipoUsuarioId);
        }
      });
    })
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    let values = form.value;

    this.userForm.get('nombre').disable();
    this.userForm.get('email').disable();

    if (this.user.email === this.auth.getUserEmail()) {
      values.tipoUsuario = 0;
    }

    this.userService.updateUser(this.user.usuarioId, values.nombre, values.email, values.tipoUsuario).pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.openSnackBar('Usuario actualizado.');
      if (values.email !== this.user.email) {
        this._dialogService.openAlert({
          message: 'Debe volver a iniciar sesión para ver los cambios del nuevo email',
          disableClose: false, // defaults to false
          //viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Cambio de email', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
        this.auth.logout()
      }
      this.userForm.get('nombre').enable();
      this.userForm.get('email').enable();
      this.getUser();

    }, error => {
      this.userForm.enable();
      console.log(error);
    });
  }


  openSnackBar(texto: string) {
    this._snackBar.open(texto, 'Ok', { duration: 3000 });
  }

  userImageLoaded() {
    this.userImageLoadedVar = true;
  }

  changeStatus(userId: number) {
    this.userService.changeStatus(userId).subscribe(event => {
      this.openSnackBar('Usuario actualizado.');
    }, error => {
      if (error.error.status === 409) {
        this.getUser();
        this._dialogService.openAlert({
          message: error.error.message,
          disableClose: false, // defaults to false
          viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'No se pudo ejecutar cambio de estado', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      } else {
        this._dialogService.openAlert({
          message: 'Ha ocurrido un error interno, intente de nuevo más tarde.',
          disableClose: false, // defaults to false
          viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Error', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      }

    })
  }

  openModal(option: number) {
    let dialogRef: any;
    dialogRef = this.dialog.open(UploadUserImagesComponent, {
      width: '40%',
      height: '55%',
      panelClass: 'instance-dialog',
      disableClose: true,
      data: { option, userImage: true, section: 'user', type: 'user' },
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.getUser();
    });
  }


  deleteImage() {
    this.userService.deleteImage().subscribe(event => {
      this.openSnackBar('Imagen Actualizada');
      this.getUser();
      this.userImageLoadedVar = false;
    }, error => {
      if (error.error.status === 409) {
        this.getUser();
        this._dialogService.openAlert({
          message: error.error.message,
          disableClose: false, // defaults to false
          viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'No se pudo ejecutar cambio de estado', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      } else {
        this._dialogService.openAlert({
          message: 'Ha ocurrido un error interno, intente de nuevo más tarde.',
          disableClose: false, // defaults to false
          viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Error', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      }

    })
  }

}
