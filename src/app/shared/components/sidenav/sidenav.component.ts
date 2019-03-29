import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() optionClick = new EventEmitter<any>();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout();
    this.optionClick.next();
  }

  changeOption(option: string) {
    this.router.navigate([`/${option}`]);
    this.optionClick.next();
  }

}
