import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AyudaRoutingModule } from './ayuda-routing.module';
import { MaterialModule, CovalentModule } from './dependencies';
import { AyudaComponent } from './ayuda/ayuda.component';

@NgModule({
  declarations: [AyudaComponent],
  imports: [
    AyudaRoutingModule,
    SharedModule,
    MaterialModule,
    CovalentModule
  ]
})
export class AyudaModule {}
