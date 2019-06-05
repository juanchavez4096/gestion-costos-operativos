import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TdLayoutComponent } from '@covalent/core/layout';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  public name: string;
  public email: string;
  public actualSite: string;
  public goBack: string
  @ViewChild(TdLayoutComponent) layout: TdLayoutComponent;
  constructor(private authService: AuthService, private router: Router) { 
    this.router.events.subscribe( val => {
      if (val instanceof NavigationEnd) {
        if(val.url.includes('/materials'))
          this.actualSite = 'Materiales';
        if(val.url.includes('/products') ){
          this.actualSite = 'Productos';
        }
        if (val.url.includes('/products') && val.url !== '/products') {
          this.goBack = '/products'
          if(val.url === '/products/add'){
            this.actualSite = 'Añadir Productos';
          }
        }else if (val.url.includes('/materials') && val.url !== '/materials') {
          this.goBack = '/materials'
          if(val.url === '/materials/add'){
            this.actualSite = 'Añadir Materiales';
          }
        }else {
          this.goBack = null;
        }
        
      }
    })
  }

  ngOnInit() {
    this.name = this.authService.getUserDisplayName();
    this.email = this.authService.getUserEmail();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  closeSidebar() {
    this.layout.close();
  }

  goBackFunction(){
    if(this.goBack != null){
      this.router.navigate([this.goBack]);
      this.goBack = null
    }
  }

  agregar(){
    if(this.router.url === '/products'){
      this.router.navigate(['/products/add'])
    }
    if(this.router.url === '/materials'){
      this.router.navigate(['/materials/add'])
    }
  }

}
