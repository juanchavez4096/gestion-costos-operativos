import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from '../core/services/auth.guard';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', component: ListProductsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ProductComponent, canActivate: [AuthGuard] },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
