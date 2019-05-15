import { NgModule } from '@angular/core';
import { MaterialComponent } from './material/material.component';
import { ListMaterialsComponent } from './list-materials/list-materials.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialModule } from './dependencies';

@NgModule({
  declarations: [MaterialComponent, ListMaterialsComponent],
  imports: [
    MaterialsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class MaterialsModule {}
