import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  ReservationMySuffixComponent,
  ReservationMySuffixDetailComponent,
  ReservationMySuffixUpdateComponent,
  ReservationMySuffixDeletePopupComponent,
  ReservationMySuffixDeleteDialogComponent,
  reservationRoute,
  reservationPopupRoute
} from './';

const ENTITY_STATES = [...reservationRoute, ...reservationPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReservationMySuffixComponent,
    ReservationMySuffixDetailComponent,
    ReservationMySuffixUpdateComponent,
    ReservationMySuffixDeleteDialogComponent,
    ReservationMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ReservationMySuffixComponent,
    ReservationMySuffixUpdateComponent,
    ReservationMySuffixDeleteDialogComponent,
    ReservationMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantReservationMySuffixModule {}
