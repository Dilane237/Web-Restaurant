import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TablesMySuffix } from 'app/shared/model/tables-my-suffix.model';
import { TablesMySuffixService } from './tables-my-suffix.service';
import { TablesMySuffixComponent } from './tables-my-suffix.component';
import { TablesMySuffixDetailComponent } from './tables-my-suffix-detail.component';
import { TablesMySuffixUpdateComponent } from './tables-my-suffix-update.component';
import { TablesMySuffixDeletePopupComponent } from './tables-my-suffix-delete-dialog.component';
import { ITablesMySuffix } from 'app/shared/model/tables-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TablesMySuffixResolve implements Resolve<ITablesMySuffix> {
  constructor(private service: TablesMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITablesMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TablesMySuffix>) => response.ok),
        map((tables: HttpResponse<TablesMySuffix>) => tables.body)
      );
    }
    return of(new TablesMySuffix());
  }
}

export const tablesRoute: Routes = [
  {
    path: '',
    component: TablesMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TablesMySuffixDetailComponent,
    resolve: {
      tables: TablesMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TablesMySuffixUpdateComponent,
    resolve: {
      tables: TablesMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TablesMySuffixUpdateComponent,
    resolve: {
      tables: TablesMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tablesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TablesMySuffixDeletePopupComponent,
    resolve: {
      tables: TablesMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
