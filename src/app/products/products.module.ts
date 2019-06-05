import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { MaterialModule, CovalentModule } from './dependencies';
import { AddComponent } from './add/add.component';
import { AddProductoMaterialComponent } from './add-producto-material/add-producto-material.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  entryComponents: [AddProductoMaterialComponent],
  providers: [
    
  ],
  declarations: [ProductComponent, ListProductsComponent, AddComponent, AddProductoMaterialComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    MaterialModule,
    CovalentModule
  ],
})
export class ProductsModule { }
