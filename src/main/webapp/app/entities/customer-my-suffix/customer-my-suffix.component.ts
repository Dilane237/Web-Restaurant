import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { AccountService } from 'app/core';
import { CustomerMySuffixService } from './customer-my-suffix.service';

@Component({
  selector: 'jhi-customer-my-suffix',
  templateUrl: './customer-my-suffix.component.html'
})
export class CustomerMySuffixComponent implements OnInit, OnDestroy {
  customers: ICustomerMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected customerService: CustomerMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.customerService
      .query()
      .pipe(
        filter((res: HttpResponse<ICustomerMySuffix[]>) => res.ok),
        map((res: HttpResponse<ICustomerMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ICustomerMySuffix[]) => {
          this.customers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCustomers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICustomerMySuffix) {
    return item.id;
  }

  registerChangeInCustomers() {
    this.eventSubscriber = this.eventManager.subscribe('customerListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
