import { NgModule } from '@angular/core';
import { MaterialComponent } from './material/material.component';
import { ListMaterialsComponent } from './list-materials/list-materials.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialModule, CovalentModule } from './dependencies';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [MaterialComponent, ListMaterialsComponent, AddComponent],
  imports: [
    MaterialsRoutingModule,
    SharedModule,
    MaterialModule,
    CovalentModule
  ]
})
export class MaterialsModule {}
