import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RestaurantSharedLibsModule, RestaurantSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [RestaurantSharedLibsModule, RestaurantSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [RestaurantSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantSharedModule {
  static forRoot() {
    return {
      ngModule: RestaurantSharedModule
    };
  }
}
