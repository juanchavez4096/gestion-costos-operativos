import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService, UserService } from '../../core/services';
import { Router } from '@angular/router';
import { IPageChangeEvent } from '@covalent/core/paging';
import { TdDialogService } from '@covalent/core/dialogs';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  random = Math.random();
  public environment = environment;
  pageSize: number = 0;
  total: number = 0;
  searchInputTerm: string = '';
  users: any[] = [];
  beginPage = false;
  
  constructor(private userService: UserService, public auth: AuthService, private router: Router, private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.searchUsers(0,'');
    this.beginPage = true;
  }

  goToUser(userId: number){
    this.router.navigate([`administration`, userId]); 
  }

  searchUsers(page: number,event: string){
    this.searchInputTerm = event
    this.userService.getUsers(page,this.searchInputTerm).subscribe(user => {
      this.users = user.content;
      this.total = user.totalElements;
      this.pageSize = user.size;
    })
  }

  imageLoaded(i: number){
    this.users[i].imageLoaded = true;
  }

  changePage(event: IPageChangeEvent){
    if (!this.beginPage) {
      this.searchUsers(event.page-1, this.searchInputTerm);
    }else{
      this.beginPage = false;

    }
    
  }

  changeStatus(userId: number){
        this.userService.changeStatus(userId).subscribe(event => {
          this.openSnackBar('Usuario actualizado.');
          this.searchUsers(0, '');
        }, error => {
          if (error.error.status === 409) {
            this.searchUsers(0, '');
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

  searchProducts(page: number,event: string){
    this.searchInputTerm = event
    this.userService.getUsers(page,this.searchInputTerm).subscribe(user => {
      this.users = user.content;
      this.total = user.totalElements;
      this.pageSize = user.size;
    })
  }

  openSnackBar(texto: string) {
    this._snackBar.open(texto, 'Ok', {duration: 3000});
  }

}
