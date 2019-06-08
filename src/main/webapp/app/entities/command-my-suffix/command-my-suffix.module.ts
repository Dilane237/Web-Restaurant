import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  CommandMySuffixComponent,
  CommandMySuffixDetailComponent,
  CommandMySuffixUpdateComponent,
  CommandMySuffixDeletePopupComponent,
  CommandMySuffixDeleteDialogComponent,
  commandRoute,
  commandPopupRoute
} from './';

const ENTITY_STATES = [...commandRoute, ...commandPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CommandMySuffixComponent,
    CommandMySuffixDetailComponent,
    CommandMySuffixUpdateComponent,
    CommandMySuffixDeleteDialogComponent,
    CommandMySuffixDeletePopupComponent
  ],
  entryComponents: [
    CommandMySuffixComponent,
    CommandMySuffixUpdateComponent,
    CommandMySuffixDeleteDialogComponent,
    CommandMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantCommandMySuffixModule {}
