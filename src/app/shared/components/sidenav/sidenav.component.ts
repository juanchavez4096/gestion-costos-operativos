import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output() optionClick = new EventEmitter<any>();
  @Input() public actualSite: string;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    //this.rol = this.authService.getUserRoleId();
  }

  ngOnDestroy() {
    //this.rol = null;
  }

  logOut() {
    localStorage.clear();
    this.authService.logout();
    this.optionClick.next('out');
    //this.rol = null;
  }

  changeOption(option: string) {
    this.router.navigate([`/${option}`]);
    this.optionClick.next();
  }

  goToPerfil(){
    
    
    this.router.navigate([`administration/perfil`]); 
    this.optionClick.next();
  }

}
