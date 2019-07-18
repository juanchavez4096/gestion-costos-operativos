import { NgModule } from '@angular/core';
import {
   MatCardModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatRippleModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule, MatSlideToggleModule
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
    NgxChartsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSlideToggleModule
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
    NgxChartsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
