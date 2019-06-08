import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';
import { CustomerMySuffixComponent } from './customer-my-suffix.component';
import { CustomerMySuffixDetailComponent } from './customer-my-suffix-detail.component';
import { CustomerMySuffixUpdateComponent } from './customer-my-suffix-update.component';
import { CustomerMySuffixDeletePopupComponent } from './customer-my-suffix-delete-dialog.component';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CustomerMySuffixResolve implements Resolve<ICustomerMySuffix> {
  constructor(private service: CustomerMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomerMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CustomerMySuffix>) => response.ok),
        map((customer: HttpResponse<CustomerMySuffix>) => customer.body)
      );
    }
    return of(new CustomerMySuffix());
  }
}

export const customerRoute: Routes = [
  {
    path: '',
    component: CustomerMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CustomerMySuffixDetailComponent,
    resolve: {
      customer: CustomerMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CustomerMySuffixUpdateComponent,
    resolve: {
      customer: CustomerMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CustomerMySuffixUpdateComponent,
    resolve: {
      customer: CustomerMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const customerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CustomerMySuffixDeletePopupComponent,
    resolve: {
      customer: CustomerMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
