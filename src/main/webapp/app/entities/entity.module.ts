import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer-my-suffix',
        loadChildren: './customer-my-suffix/customer-my-suffix.module#RestaurantCustomerMySuffixModule'
      },
      {
        path: 'command-my-suffix',
        loadChildren: './command-my-suffix/command-my-suffix.module#RestaurantCommandMySuffixModule'
      },
      {
        path: 'menu-my-suffix',
        loadChildren: './menu-my-suffix/menu-my-suffix.module#RestaurantMenuMySuffixModule'
      },
      {
        path: 'type-of-menu-my-suffix',
        loadChildren: './type-of-menu-my-suffix/type-of-menu-my-suffix.module#RestaurantTypeOfMenuMySuffixModule'
      },
      {
        path: 'billing-my-suffix',
        loadChildren: './billing-my-suffix/billing-my-suffix.module#RestaurantBillingMySuffixModule'
      },
      {
        path: 'tables-my-suffix',
        loadChildren: './tables-my-suffix/tables-my-suffix.module#RestaurantTablesMySuffixModule'
      },
      {
        path: 'reservation-my-suffix',
        loadChildren: './reservation-my-suffix/reservation-my-suffix.module#RestaurantReservationMySuffixModule'
      },
      {
        path: 'fonction-my-suffix',
        loadChildren: './fonction-my-suffix/fonction-my-suffix.module#RestaurantFonctionMySuffixModule'
      },
      {
        path: 'setting-my-suffix',
        loadChildren: './setting-my-suffix/setting-my-suffix.module#RestaurantSettingMySuffixModule'
      },
      {
        path: 'reservation-my-suffix',
        loadChildren: './reservation-my-suffix/reservation-my-suffix.module#RestaurantReservationMySuffixModule'
      },
      {
        path: 'reservation',
        loadChildren: './reservation/reservation.module#RestaurantReservationModule'
      },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#RestaurantTablesModule'
      },
      {
        path: 'reservation',
        loadChildren: './reservation/reservation.module#RestaurantReservationModule'
      },
      {
        path: 'fonction-my-suffix',
        loadChildren: './fonction-my-suffix/fonction-my-suffix.module#RestaurantFonctionMySuffixModule'
      },
      {
        path: 'fonction-my-suffix',
        loadChildren: './fonction-my-suffix/fonction-my-suffix.module#RestaurantFonctionMySuffixModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantEntityModule {}
