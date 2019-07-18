import { NgModule } from '@angular/core';
import {
   MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,MatSlideToggleModule
} from '@angular/material';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
