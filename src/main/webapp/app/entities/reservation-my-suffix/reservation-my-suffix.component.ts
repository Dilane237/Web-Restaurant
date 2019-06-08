import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';
import { AccountService } from 'app/core';
import { ReservationMySuffixService } from './reservation-my-suffix.service';

@Component({
  selector: 'jhi-reservation-my-suffix',
  templateUrl: './reservation-my-suffix.component.html'
})
export class ReservationMySuffixComponent implements OnInit, OnDestroy {
  reservations: IReservationMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reservationService: ReservationMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.reservationService
      .query()
      .pipe(
        filter((res: HttpResponse<IReservationMySuffix[]>) => res.ok),
        map((res: HttpResponse<IReservationMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IReservationMySuffix[]) => {
          this.reservations = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInReservations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReservationMySuffix) {
    return item.id;
  }

  registerChangeInReservations() {
    this.eventSubscriber = this.eventManager.subscribe('reservationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
