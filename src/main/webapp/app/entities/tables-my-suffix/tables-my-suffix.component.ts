import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITablesMySuffix } from 'app/shared/model/tables-my-suffix.model';
import { AccountService } from 'app/core';
import { TablesMySuffixService } from './tables-my-suffix.service';

@Component({
  selector: 'jhi-tables-my-suffix',
  templateUrl: './tables-my-suffix.component.html'
})
export class TablesMySuffixComponent implements OnInit, OnDestroy {
  tables: ITablesMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tablesService: TablesMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tablesService
      .query()
      .pipe(
        filter((res: HttpResponse<ITablesMySuffix[]>) => res.ok),
        map((res: HttpResponse<ITablesMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ITablesMySuffix[]) => {
          this.tables = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTables();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITablesMySuffix) {
    return item.id;
  }

  registerChangeInTables() {
    this.eventSubscriber = this.eventManager.subscribe('tablesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
