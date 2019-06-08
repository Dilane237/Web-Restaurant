import { NgModule } from '@angular/core';

import { RestaurantSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [RestaurantSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [RestaurantSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class RestaurantSharedCommonModule {}
