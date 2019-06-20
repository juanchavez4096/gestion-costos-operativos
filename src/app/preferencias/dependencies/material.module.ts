import { NgModule } from '@angular/core';
import {
   MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,MatSlideToggleModule
} from '@angular/material';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  imports: [
    
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskModule.forRoot(),
    MatSlideToggleModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
