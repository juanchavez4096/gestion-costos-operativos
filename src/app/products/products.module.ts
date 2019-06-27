import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { MaterialModule, CovalentModule } from './dependencies';
import { AddComponent } from './add/add.component';
import { AddProductoMaterialComponent } from './add-producto-material/add-producto-material.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  entryComponents: [AddProductoMaterialComponent, HistoryComponent],
  providers: [
    
  ],
  declarations: [ProductComponent, ListProductsComponent, AddComponent, AddProductoMaterialComponent, HistoryComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    MaterialModule,
    CovalentModule
  ],
})
export class ProductsModule { }
