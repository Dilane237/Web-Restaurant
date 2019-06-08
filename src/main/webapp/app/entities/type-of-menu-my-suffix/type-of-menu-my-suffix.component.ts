import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';
import { AccountService } from 'app/core';
import { TypeOfMenuMySuffixService } from './type-of-menu-my-suffix.service';

@Component({
  selector: 'jhi-type-of-menu-my-suffix',
  templateUrl: './type-of-menu-my-suffix.component.html'
})
export class TypeOfMenuMySuffixComponent implements OnInit, OnDestroy {
  typeOfMenus: ITypeOfMenuMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected typeOfMenuService: TypeOfMenuMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.typeOfMenuService
      .query()
      .pipe(
        filter((res: HttpResponse<ITypeOfMenuMySuffix[]>) => res.ok),
        map((res: HttpResponse<ITypeOfMenuMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ITypeOfMenuMySuffix[]) => {
          this.typeOfMenus = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTypeOfMenus();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITypeOfMenuMySuffix) {
    return item.id;
  }

  registerChangeInTypeOfMenus() {
    this.eventSubscriber = this.eventManager.subscribe('typeOfMenuListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
