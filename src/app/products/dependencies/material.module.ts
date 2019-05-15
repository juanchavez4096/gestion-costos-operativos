import { NgModule } from '@angular/core';
import {
   MatCardModule, MatListModule, MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatListModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
