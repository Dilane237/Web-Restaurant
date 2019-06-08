import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuMySuffix } from 'app/shared/model/menu-my-suffix.model';
import { MenuMySuffixService } from './menu-my-suffix.service';
import { MenuMySuffixComponent } from './menu-my-suffix.component';
import { MenuMySuffixDetailComponent } from './menu-my-suffix-detail.component';
import { MenuMySuffixUpdateComponent } from './menu-my-suffix-update.component';
import { MenuMySuffixDeletePopupComponent } from './menu-my-suffix-delete-dialog.component';
import { IMenuMySuffix } from 'app/shared/model/menu-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class MenuMySuffixResolve implements Resolve<IMenuMySuffix> {
  constructor(private service: MenuMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMenuMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MenuMySuffix>) => response.ok),
        map((menu: HttpResponse<MenuMySuffix>) => menu.body)
      );
    }
    return of(new MenuMySuffix());
  }
}

export const menuRoute: Routes = [
  {
    path: '',
    component: MenuMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MenuMySuffixDetailComponent,
    resolve: {
      menu: MenuMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MenuMySuffixUpdateComponent,
    resolve: {
      menu: MenuMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MenuMySuffixUpdateComponent,
    resolve: {
      menu: MenuMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const menuPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MenuMySuffixDeletePopupComponent,
    resolve: {
      menu: MenuMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
