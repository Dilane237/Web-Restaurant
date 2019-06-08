import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  TypeOfMenuMySuffixComponent,
  TypeOfMenuMySuffixDetailComponent,
  TypeOfMenuMySuffixUpdateComponent,
  TypeOfMenuMySuffixDeletePopupComponent,
  TypeOfMenuMySuffixDeleteDialogComponent,
  typeOfMenuRoute,
  typeOfMenuPopupRoute
} from './';

const ENTITY_STATES = [...typeOfMenuRoute, ...typeOfMenuPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TypeOfMenuMySuffixComponent,
    TypeOfMenuMySuffixDetailComponent,
    TypeOfMenuMySuffixUpdateComponent,
    TypeOfMenuMySuffixDeleteDialogComponent,
    TypeOfMenuMySuffixDeletePopupComponent
  ],
  entryComponents: [
    TypeOfMenuMySuffixComponent,
    TypeOfMenuMySuffixUpdateComponent,
    TypeOfMenuMySuffixDeleteDialogComponent,
    TypeOfMenuMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantTypeOfMenuMySuffixModule {}
