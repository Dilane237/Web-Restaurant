import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';
import { TypeOfMenuMySuffixService } from './type-of-menu-my-suffix.service';
import { TypeOfMenuMySuffixComponent } from './type-of-menu-my-suffix.component';
import { TypeOfMenuMySuffixDetailComponent } from './type-of-menu-my-suffix-detail.component';
import { TypeOfMenuMySuffixUpdateComponent } from './type-of-menu-my-suffix-update.component';
import { TypeOfMenuMySuffixDeletePopupComponent } from './type-of-menu-my-suffix-delete-dialog.component';
import { ITypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TypeOfMenuMySuffixResolve implements Resolve<ITypeOfMenuMySuffix> {
  constructor(private service: TypeOfMenuMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITypeOfMenuMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TypeOfMenuMySuffix>) => response.ok),
        map((typeOfMenu: HttpResponse<TypeOfMenuMySuffix>) => typeOfMenu.body)
      );
    }
    return of(new TypeOfMenuMySuffix());
  }
}

export const typeOfMenuRoute: Routes = [
  {
    path: '',
    component: TypeOfMenuMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeOfMenus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeOfMenuMySuffixDetailComponent,
    resolve: {
      typeOfMenu: TypeOfMenuMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeOfMenus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeOfMenuMySuffixUpdateComponent,
    resolve: {
      typeOfMenu: TypeOfMenuMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeOfMenus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeOfMenuMySuffixUpdateComponent,
    resolve: {
      typeOfMenu: TypeOfMenuMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeOfMenus'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const typeOfMenuPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TypeOfMenuMySuffixDeletePopupComponent,
    resolve: {
      typeOfMenu: TypeOfMenuMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TypeOfMenus'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
