import { NgModule } from '@angular/core';

import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentFileModule } from '@covalent/core/file';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentChipsModule } from '@covalent/core/chips';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';
import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentPagingModule } from '@covalent/core/paging';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentMessageModule } from '@covalent/core/message';

@NgModule({
  imports: [
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentFileModule,
    CovalentDialogsModule,
    CovalentChipsModule,
    CovalentExpansionPanelModule,
    CovalentCommonModule,
    CovalentNotificationsModule,
    CovalentSearchModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentLoadingModule,
    CovalentMessageModule,
  ],
  exports: [
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentFileModule,
    CovalentDialogsModule,
    CovalentChipsModule,
    CovalentExpansionPanelModule,
    CovalentCommonModule,
    CovalentNotificationsModule,
    CovalentSearchModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentLoadingModule,
    CovalentMessageModule
  ]
})
export class CovalentModule { }
