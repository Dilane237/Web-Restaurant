import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  BillingMySuffixComponent,
  BillingMySuffixDetailComponent,
  BillingMySuffixUpdateComponent,
  BillingMySuffixDeletePopupComponent,
  BillingMySuffixDeleteDialogComponent,
  billingRoute,
  billingPopupRoute
} from './';

const ENTITY_STATES = [...billingRoute, ...billingPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BillingMySuffixComponent,
    BillingMySuffixDetailComponent,
    BillingMySuffixUpdateComponent,
    BillingMySuffixDeleteDialogComponent,
    BillingMySuffixDeletePopupComponent
  ],
  entryComponents: [
    BillingMySuffixComponent,
    BillingMySuffixUpdateComponent,
    BillingMySuffixDeleteDialogComponent,
    BillingMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantBillingMySuffixModule {}
