import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  MenuMySuffixComponent,
  MenuMySuffixDetailComponent,
  MenuMySuffixUpdateComponent,
  MenuMySuffixDeletePopupComponent,
  MenuMySuffixDeleteDialogComponent,
  menuRoute,
  menuPopupRoute
} from './';

const ENTITY_STATES = [...menuRoute, ...menuPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MenuMySuffixComponent,
    MenuMySuffixDetailComponent,
    MenuMySuffixUpdateComponent,
    MenuMySuffixDeleteDialogComponent,
    MenuMySuffixDeletePopupComponent
  ],
  entryComponents: [
    MenuMySuffixComponent,
    MenuMySuffixUpdateComponent,
    MenuMySuffixDeleteDialogComponent,
    MenuMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantMenuMySuffixModule {}
