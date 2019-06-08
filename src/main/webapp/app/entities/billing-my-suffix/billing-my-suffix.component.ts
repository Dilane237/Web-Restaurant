import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBillingMySuffix } from 'app/shared/model/billing-my-suffix.model';
import { AccountService } from 'app/core';
import { BillingMySuffixService } from './billing-my-suffix.service';

@Component({
  selector: 'jhi-billing-my-suffix',
  templateUrl: './billing-my-suffix.component.html'
})
export class BillingMySuffixComponent implements OnInit, OnDestroy {
  billings: IBillingMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected billingService: BillingMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.billingService
      .query()
      .pipe(
        filter((res: HttpResponse<IBillingMySuffix[]>) => res.ok),
        map((res: HttpResponse<IBillingMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IBillingMySuffix[]) => {
          this.billings = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBillings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBillingMySuffix) {
    return item.id;
  }

  registerChangeInBillings() {
    this.eventSubscriber = this.eventManager.subscribe('billingListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
