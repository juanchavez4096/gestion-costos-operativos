import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TdLayoutComponent } from '@covalent/core/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  public name: string;
  public email: string;
  @ViewChild(TdLayoutComponent) layout: TdLayoutComponent;
  constructor(private authService: AuthService) { }

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
