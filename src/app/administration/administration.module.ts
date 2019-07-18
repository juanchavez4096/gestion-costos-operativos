import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import { MaterialModule, CovalentModule } from './dependencies';


@NgModule({
  declarations: [AddComponent, ListUsersComponent, UsersComponent],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
    MaterialModule,
    CovalentModule
  ]
})
export class AdministrationModule { }
