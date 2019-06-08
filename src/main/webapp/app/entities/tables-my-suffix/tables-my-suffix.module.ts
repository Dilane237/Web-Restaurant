import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  TablesMySuffixComponent,
  TablesMySuffixDetailComponent,
  TablesMySuffixUpdateComponent,
  TablesMySuffixDeletePopupComponent,
  TablesMySuffixDeleteDialogComponent,
  tablesRoute,
  tablesPopupRoute
} from './';

const ENTITY_STATES = [...tablesRoute, ...tablesPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TablesMySuffixComponent,
    TablesMySuffixDetailComponent,
    TablesMySuffixUpdateComponent,
    TablesMySuffixDeleteDialogComponent,
    TablesMySuffixDeletePopupComponent
  ],
  entryComponents: [
    TablesMySuffixComponent,
    TablesMySuffixUpdateComponent,
    TablesMySuffixDeleteDialogComponent,
    TablesMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantTablesMySuffixModule {}
