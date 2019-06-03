import { NgModule } from '@angular/core';
import { CovalentFileModule } from '@covalent/core/file';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentPagingModule } from '@covalent/core/paging';
import { CovalentDialogsModule } from '@covalent/core/dialogs';



@NgModule({
  imports: [
    CovalentFileModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentDialogsModule
  ],
  exports: [
    CovalentFileModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentDialogsModule
  ]
})
export class CovalentModule { }
