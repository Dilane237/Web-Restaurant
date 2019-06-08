import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CommandMySuffix } from 'app/shared/model/command-my-suffix.model';
import { CommandMySuffixService } from './command-my-suffix.service';
import { CommandMySuffixComponent } from './command-my-suffix.component';
import { CommandMySuffixDetailComponent } from './command-my-suffix-detail.component';
import { CommandMySuffixUpdateComponent } from './command-my-suffix-update.component';
import { CommandMySuffixDeletePopupComponent } from './command-my-suffix-delete-dialog.component';
import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CommandMySuffixResolve implements Resolve<ICommandMySuffix> {
  constructor(private service: CommandMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICommandMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CommandMySuffix>) => response.ok),
        map((command: HttpResponse<CommandMySuffix>) => command.body)
      );
    }
    return of(new CommandMySuffix());
  }
}

export const commandRoute: Routes = [
  {
    path: '',
    component: CommandMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CommandMySuffixDetailComponent,
    resolve: {
      command: CommandMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CommandMySuffixUpdateComponent,
    resolve: {
      command: CommandMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CommandMySuffixUpdateComponent,
    resolve: {
      command: CommandMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const commandPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CommandMySuffixDeletePopupComponent,
    resolve: {
      command: CommandMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
