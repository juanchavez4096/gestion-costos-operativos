import { NgModule } from '@angular/core';
import {
   MatCardModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatRippleModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule, MatSelectModule
} from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
    NgxChartsModule
  ],
  exports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgxMaskModule,
    NgxChartsModule
  ]
})
export class MaterialModule { }
