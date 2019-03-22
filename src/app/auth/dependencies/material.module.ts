import { NgModule } from '@angular/core';
import {
  MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule
  ]
})
export class MaterialModule { }
