import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BillingMySuffix } from 'app/shared/model/billing-my-suffix.model';
import { BillingMySuffixService } from './billing-my-suffix.service';
import { BillingMySuffixComponent } from './billing-my-suffix.component';
import { BillingMySuffixDetailComponent } from './billing-my-suffix-detail.component';
import { BillingMySuffixUpdateComponent } from './billing-my-suffix-update.component';
import { BillingMySuffixDeletePopupComponent } from './billing-my-suffix-delete-dialog.component';
import { IBillingMySuffix } from 'app/shared/model/billing-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class BillingMySuffixResolve implements Resolve<IBillingMySuffix> {
  constructor(private service: BillingMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBillingMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<BillingMySuffix>) => response.ok),
        map((billing: HttpResponse<BillingMySuffix>) => billing.body)
      );
    }
    return of(new BillingMySuffix());
  }
}

export const billingRoute: Routes = [
  {
    path: '',
    component: BillingMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Billings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BillingMySuffixDetailComponent,
    resolve: {
      billing: BillingMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Billings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BillingMySuffixUpdateComponent,
    resolve: {
      billing: BillingMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Billings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BillingMySuffixUpdateComponent,
    resolve: {
      billing: BillingMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Billings'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const billingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BillingMySuffixDeletePopupComponent,
    resolve: {
      billing: BillingMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Billings'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
