import { NgModule } from '@angular/core';
import { CovalentFileModule } from '@covalent/core/file';



@NgModule({
  imports: [
    CovalentFileModule
  ],
  exports: [
    CovalentFileModule
  ]
})
export class CovalentModule { }
