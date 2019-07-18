import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { AddComponent } from './add/add.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: ':id', component: UsersComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class AdministrationRoutingModule { }
