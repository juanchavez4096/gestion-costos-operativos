import { NgModule } from '@angular/core';
import { CovalentFileModule } from '@covalent/core/file';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentPagingModule } from '@covalent/core/paging';



@NgModule({
  imports: [
    CovalentFileModule,
    CovalentSearchModule,
    CovalentPagingModule
  ],
  exports: [
    CovalentFileModule,
    CovalentSearchModule,
    CovalentPagingModule
  ]
})
export class CovalentModule { }
