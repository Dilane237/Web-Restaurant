import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  TablesComponent,
  TablesDetailComponent,
  TablesUpdateComponent,
  TablesDeletePopupComponent,
  TablesDeleteDialogComponent,
  tablesRoute,
  tablesPopupRoute
} from './';

const ENTITY_STATES = [...tablesRoute, ...tablesPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TablesComponent, TablesDetailComponent, TablesUpdateComponent, TablesDeleteDialogComponent, TablesDeletePopupComponent],
  entryComponents: [TablesComponent, TablesUpdateComponent, TablesDeleteDialogComponent, TablesDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantTablesModule {}
