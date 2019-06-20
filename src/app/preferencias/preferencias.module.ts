import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialsRoutingModule } from './preferencias-routing.module';
import { MaterialModule, CovalentModule } from './dependencies';
import { PreferenciasComponent } from './preferencias/preferencias.component';

@NgModule({
  declarations: [PreferenciasComponent],
  imports: [
    MaterialsRoutingModule,
    SharedModule,
    MaterialModule,
    CovalentModule
  ]
})
export class PreferenciasModule {}
