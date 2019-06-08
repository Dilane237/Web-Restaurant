import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';
import { FonctionMySuffixService } from './fonction-my-suffix.service';
import { FonctionMySuffixComponent } from './fonction-my-suffix.component';
import { FonctionMySuffixDetailComponent } from './fonction-my-suffix-detail.component';
import { FonctionMySuffixUpdateComponent } from './fonction-my-suffix-update.component';
import { FonctionMySuffixDeletePopupComponent } from './fonction-my-suffix-delete-dialog.component';
import { IFonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class FonctionMySuffixResolve implements Resolve<IFonctionMySuffix> {
  constructor(private service: FonctionMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFonctionMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FonctionMySuffix>) => response.ok),
        map((fonction: HttpResponse<FonctionMySuffix>) => fonction.body)
      );
    }
    return of(new FonctionMySuffix());
  }
}

export const fonctionRoute: Routes = [
  {
    path: '',
    component: FonctionMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fonctions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FonctionMySuffixDetailComponent,
    resolve: {
      fonction: FonctionMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fonctions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FonctionMySuffixUpdateComponent,
    resolve: {
      fonction: FonctionMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fonctions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FonctionMySuffixUpdateComponent,
    resolve: {
      fonction: FonctionMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fonctions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const fonctionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FonctionMySuffixDeletePopupComponent,
    resolve: {
      fonction: FonctionMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fonctions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
