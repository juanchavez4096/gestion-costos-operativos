import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public rol: number

  @Output() optionClick = new EventEmitter<any>();
  @Input() public actualSite: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.rol = this.authService.getUserRoleId();
  }

  logOut() {
    localStorage.clear();
    this.authService.logout();
    this.optionClick.next();
  }

  changeOption(option: string) {
    this.router.navigate([`/${option}`]);
    this.optionClick.next();
  }

}
