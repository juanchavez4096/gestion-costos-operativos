import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { MaterialModule, CovalentModule } from './dependencies';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [ProductComponent, ListProductsComponent, AddComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    MaterialModule,
    CovalentModule
  ]
})
export class ProductsModule { }
