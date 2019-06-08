import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Tables } from 'app/shared/model/tables.model';
import { TablesService } from './tables.service';
import { TablesComponent } from './tables.component';
import { TablesDetailComponent } from './tables-detail.component';
import { TablesUpdateComponent } from './tables-update.component';
import { TablesDeletePopupComponent } from './tables-delete-dialog.component';
import { ITables } from 'app/shared/model/tables.model';

@Injectable({ providedIn: 'root' })
export class TablesResolve implements Resolve<ITables> {
  constructor(private service: TablesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITables> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Tables>) => response.ok),
        map((tables: HttpResponse<Tables>) => tables.body)
      );
    }
    return of(new Tables());
  }
}

export const tablesRoute: Routes = [
  {
    path: '',
    component: TablesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TablesDetailComponent,
    resolve: {
      tables: TablesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TablesUpdateComponent,
    resolve: {
      tables: TablesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TablesUpdateComponent,
    resolve: {
      tables: TablesResolve
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
    component: TablesDeletePopupComponent,
    resolve: {
      tables: TablesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tables'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
