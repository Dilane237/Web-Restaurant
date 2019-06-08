import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITables } from 'app/shared/model/tables.model';
import { AccountService } from 'app/core';
import { TablesService } from './tables.service';

@Component({
  selector: 'jhi-tables',
  templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit, OnDestroy {
  tables: ITables[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tablesService: TablesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tablesService
      .query()
      .pipe(
        filter((res: HttpResponse<ITables[]>) => res.ok),
        map((res: HttpResponse<ITables[]>) => res.body)
      )
      .subscribe(
        (res: ITables[]) => {
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

  trackId(index: number, item: ITables) {
    return item.id;
  }

  registerChangeInTables() {
    this.eventSubscriber = this.eventManager.subscribe('tablesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
