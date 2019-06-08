import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  FonctionMySuffixComponent,
  FonctionMySuffixDetailComponent,
  FonctionMySuffixUpdateComponent,
  FonctionMySuffixDeletePopupComponent,
  FonctionMySuffixDeleteDialogComponent,
  fonctionRoute,
  fonctionPopupRoute
} from './';

const ENTITY_STATES = [...fonctionRoute, ...fonctionPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FonctionMySuffixComponent,
    FonctionMySuffixDetailComponent,
    FonctionMySuffixUpdateComponent,
    FonctionMySuffixDeleteDialogComponent,
    FonctionMySuffixDeletePopupComponent
  ],
  entryComponents: [
    FonctionMySuffixComponent,
    FonctionMySuffixUpdateComponent,
    FonctionMySuffixDeleteDialogComponent,
    FonctionMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantFonctionMySuffixModule {}
