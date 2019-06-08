import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISettingMySuffix } from 'app/shared/model/setting-my-suffix.model';
import { AccountService } from 'app/core';
import { SettingMySuffixService } from './setting-my-suffix.service';

@Component({
  selector: 'jhi-setting-my-suffix',
  templateUrl: './setting-my-suffix.component.html'
})
export class SettingMySuffixComponent implements OnInit, OnDestroy {
  settings: ISettingMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected settingService: SettingMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.settingService
      .query()
      .pipe(
        filter((res: HttpResponse<ISettingMySuffix[]>) => res.ok),
        map((res: HttpResponse<ISettingMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ISettingMySuffix[]) => {
          this.settings = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSettings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISettingMySuffix) {
    return item.id;
  }

  registerChangeInSettings() {
    this.eventSubscriber = this.eventManager.subscribe('settingListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
