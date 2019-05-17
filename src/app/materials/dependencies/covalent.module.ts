import { NgModule } from '@angular/core';
import { CovalentFileModule } from '@covalent/core/file';
import { CovalentSearchModule } from '@covalent/core/search';



@NgModule({
  imports: [
    CovalentFileModule,
    CovalentSearchModule
  ],
  exports: [
    CovalentFileModule,
    CovalentSearchModule
  ]
})
export class CovalentModule { }
