import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TdLayoutComponent } from '@covalent/core/layout';
import { Router, NavigationEnd } from '@angular/router';

import { MatDialog } from '@angular/material';
import { ReporteComponent } from '../reporte/reporte.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  @Input() public actualSite: string;
  public goBack: string;
  public preferences = false;
  @ViewChild(TdLayoutComponent) layout: TdLayoutComponent;
  @ViewChild('child') child: ElementRef;
  constructor(public authService: AuthService, private router: Router, public dialog: MatDialog) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('/materials'))
          this.actualSite = 'Materiales';
        if (val.url.includes('/products')) {
          this.actualSite = 'Productos';
        }
        if (val.url.includes('/preferencias')) {
          this.actualSite = 'Preferencias';
        }
        if (val.url.includes('/ayuda')) {
          this.actualSite = 'Ayuda';
        }
        if (val.url.includes('/administration')) {
          this.actualSite = 'Administración';
          if (val.url === '/administration/perfil') {
            this.actualSite = 'Perfil';
          }
          
        }
        if (val.url.includes('/products') && val.url !== '/products') {
          this.goBack = '/products'
          if (val.url === '/products/add') {
            this.actualSite = 'Añadir Productos';
          }
        } else if (val.url.includes('/materials') && val.url !== '/materials') {
          this.goBack = '/materials'
          if (val.url === '/materials/add') {
            this.actualSite = 'Añadir Materiales';
          }
        } else if (val.url.includes('/administration') && val.url !== '/administration') {
          this.goBack = '/administration'
          if (val.url === '/administration/'+this.getActualUserId() && this.authService.getUserRoleId() === 2) {
            this.goBack = '/products';
          }
          if (val.url === '/administration/perfil') {
            this.goBack = null;
          }
          if (val.url === '/administration/add') {
            this.actualSite = 'Añadir usuario';
          }
        }
        else {
          this.goBack = null;
        }

      }
    })
  }

  ngOnInit() {
    //this.name = this.authService.getUserDisplayName();
    //this.email = this.authService.getUserEmail();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  closeSidebar(event: any) {
    if (event === 'out') {
      //this.name = null;
      //this.email = null;
    };

    this.layout.close();
  }

  goBackFunction() {
    if (this.goBack != null) {
      this.router.navigate([this.goBack]);
      this.goBack = null
    }
  }

  agregar() {
    if (this.router.url === '/products') {
      this.router.navigate(['/products/add'])
    }
    if (this.router.url === '/materials') {
      this.router.navigate(['/materials/add'])
    }
    if (this.router.url === '/administration') {
      this.router.navigate(['/administration/add'])
    }

  }

  reporte() {

    const dialogRef = this.dialog.open(ReporteComponent, {
      width: '400px',
      disableClose: false,
      data: { reportType: this.actualSite },
    });
  }

  getActualUserId(){
    let token = this.authService.getToken(true).split('.');
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
}
