import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMenuMySuffix } from 'app/shared/model/menu-my-suffix.model';
import { AccountService } from 'app/core';
import { MenuMySuffixService } from './menu-my-suffix.service';

@Component({
  selector: 'jhi-menu-my-suffix',
  templateUrl: './menu-my-suffix.component.html'
})
export class MenuMySuffixComponent implements OnInit, OnDestroy {
  menus: IMenuMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected menuService: MenuMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.menuService
      .query()
      .pipe(
        filter((res: HttpResponse<IMenuMySuffix[]>) => res.ok),
        map((res: HttpResponse<IMenuMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IMenuMySuffix[]) => {
          this.menus = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMenus();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMenuMySuffix) {
    return item.id;
  }

  registerChangeInMenus() {
    this.eventSubscriber = this.eventManager.subscribe('menuListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
