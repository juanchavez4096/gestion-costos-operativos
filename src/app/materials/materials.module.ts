import { NgModule } from '@angular/core';
import { MaterialComponent } from './material/material.component';
import { ListMaterialsComponent } from './list-materials/list-materials.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialsRoutingModule } from './materials-routing.module';

@NgModule({
  declarations: [MaterialComponent, ListMaterialsComponent],
  imports: [
    SharedModule,
    MaterialsRoutingModule
  ]
})
export class MaterialsModule { }
