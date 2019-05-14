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
  @ViewChild(TdLayoutComponent) layout: TdLayoutComponent;
  constructor(private authService: AuthService, private router: Router) { 
    router.events.subscribe( val => {
      if (val instanceof NavigationEnd) {
        if(val.url === '/materials')
          this.actualSite = 'Materiales';
        if(val.url === '/products')
          this.actualSite = 'Productos';
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

}
