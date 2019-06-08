import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';
import { ReservationMySuffixService } from './reservation-my-suffix.service';
import { ReservationMySuffixComponent } from './reservation-my-suffix.component';
import { ReservationMySuffixDetailComponent } from './reservation-my-suffix-detail.component';
import { ReservationMySuffixUpdateComponent } from './reservation-my-suffix-update.component';
import { ReservationMySuffixDeletePopupComponent } from './reservation-my-suffix-delete-dialog.component';
import { IReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ReservationMySuffixResolve implements Resolve<IReservationMySuffix> {
  constructor(private service: ReservationMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReservationMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ReservationMySuffix>) => response.ok),
        map((reservation: HttpResponse<ReservationMySuffix>) => reservation.body)
      );
    }
    return of(new ReservationMySuffix());
  }
}

export const reservationRoute: Routes = [
  {
    path: '',
    component: ReservationMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reservations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReservationMySuffixDetailComponent,
    resolve: {
      reservation: ReservationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reservations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReservationMySuffixUpdateComponent,
    resolve: {
      reservation: ReservationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reservations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReservationMySuffixUpdateComponent,
    resolve: {
      reservation: ReservationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reservations'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reservationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReservationMySuffixDeletePopupComponent,
    resolve: {
      reservation: ReservationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reservations'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
