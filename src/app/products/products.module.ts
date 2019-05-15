import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { MaterialModule } from './dependencies';

@NgModule({
  declarations: [ProductComponent, ListProductsComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    MaterialModule
  ]
})
export class ProductsModule { }
