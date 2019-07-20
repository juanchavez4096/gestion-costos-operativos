import { NgModule } from '@angular/core';
import {
   MatCardModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatSelectModule, MatRippleModule, MatDatepickerModule, MatMenuModule
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
    MatDatepickerModule,
    MatMenuModule
    
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
    MatDatepickerModule,
    MatMenuModule
    
  ]
})
export class MaterialModule { }
