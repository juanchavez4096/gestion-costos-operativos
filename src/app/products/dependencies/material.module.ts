import { NgModule } from '@angular/core';
import {
   MatCardModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatRippleModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule, MatSelectModule
} from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';

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
    NgxMaskModule
  ]
})
export class MaterialModule { }
