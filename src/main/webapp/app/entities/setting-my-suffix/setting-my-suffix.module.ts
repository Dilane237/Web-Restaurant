import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestaurantSharedModule } from 'app/shared';
import {
  SettingMySuffixComponent,
  SettingMySuffixDetailComponent,
  SettingMySuffixUpdateComponent,
  SettingMySuffixDeletePopupComponent,
  SettingMySuffixDeleteDialogComponent,
  settingRoute,
  settingPopupRoute
} from './';

const ENTITY_STATES = [...settingRoute, ...settingPopupRoute];

@NgModule({
  imports: [RestaurantSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SettingMySuffixComponent,
    SettingMySuffixDetailComponent,
    SettingMySuffixUpdateComponent,
    SettingMySuffixDeleteDialogComponent,
    SettingMySuffixDeletePopupComponent
  ],
  entryComponents: [
    SettingMySuffixComponent,
    SettingMySuffixUpdateComponent,
    SettingMySuffixDeleteDialogComponent,
    SettingMySuffixDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantSettingMySuffixModule {}
