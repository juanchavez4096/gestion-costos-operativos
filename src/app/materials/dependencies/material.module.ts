import { NgModule } from '@angular/core';
import {
   MatCardModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatSelectModule, MatRippleModule, MatDatepickerModule
} from '@angular/material';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
    MatRippleModule,
    MatDatepickerModule
    
  ],
  exports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    NgxMaskModule,
    MatRippleModule,
    MatDatepickerModule
    
  ]
})
export class MaterialModule { }
