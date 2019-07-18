import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { AuthService, UserService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../../core/services/material.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core/dialogs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IPageChangeEvent } from '@covalent/core/paging';
import { ProductoDTO } from '../../class/ProductoDTO';

@Component({
  selector: 'app-users', 
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  pageSize: number = 0;
  total: number = 0;
  public productForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  user: any;
  empresa: any;
  userImageLoadedVar = false;
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService) {
    
  }

  ngOnInit() {
    this.getUser();
    
  }

  getUser(){

    this.userService.myEmpresa().subscribe(empresa => {
      this.empresa = empresa;
      this.userService.getUser(this.route.snapshot.params.id).subscribe(user => {
        this.user = user;
        if (this.user == null) {
          this.router.navigate(['/administration']);
        }
      });
    })
  }

  openSnackBar(texto: string) {
    this._snackBar.open(texto, 'Ok', {duration: 3000});
  }

  userImageLoaded(){
    this.userImageLoadedVar = true;
  }

  changeStatus(userId: number){
    this.userService.changeStatus(userId).subscribe(event => {
      this.openSnackBar('Usuario actualizado.');
    }, error => {
      if (error.error.status === 409) {
        this._dialogService.openAlert({
          message: error.error.message,
          disableClose: false, // defaults to false
          viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'No se pudo ejecutar cambio de estado', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      }else{
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
