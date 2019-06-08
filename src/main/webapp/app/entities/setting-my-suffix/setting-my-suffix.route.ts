import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SettingMySuffix } from 'app/shared/model/setting-my-suffix.model';
import { SettingMySuffixService } from './setting-my-suffix.service';
import { SettingMySuffixComponent } from './setting-my-suffix.component';
import { SettingMySuffixDetailComponent } from './setting-my-suffix-detail.component';
import { SettingMySuffixUpdateComponent } from './setting-my-suffix-update.component';
import { SettingMySuffixDeletePopupComponent } from './setting-my-suffix-delete-dialog.component';
import { ISettingMySuffix } from 'app/shared/model/setting-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SettingMySuffixResolve implements Resolve<ISettingMySuffix> {
  constructor(private service: SettingMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISettingMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SettingMySuffix>) => response.ok),
        map((setting: HttpResponse<SettingMySuffix>) => setting.body)
      );
    }
    return of(new SettingMySuffix());
  }
}

export const settingRoute: Routes = [
  {
    path: '',
    component: SettingMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SettingMySuffixDetailComponent,
    resolve: {
      setting: SettingMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SettingMySuffixUpdateComponent,
    resolve: {
      setting: SettingMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SettingMySuffixUpdateComponent,
    resolve: {
      setting: SettingMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const settingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SettingMySuffixDeletePopupComponent,
    resolve: {
      setting: SettingMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
