import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReservation } from 'app/shared/model/reservation.model';
import { AccountService } from 'app/core';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'jhi-reservation',
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit, OnDestroy {
  reservations: IReservation[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reservationService: ReservationService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.reservationService
      .query()
      .pipe(
        filter((res: HttpResponse<IReservation[]>) => res.ok),
        map((res: HttpResponse<IReservation[]>) => res.body)
      )
      .subscribe(
        (res: IReservation[]) => {
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

  trackId(index: number, item: IReservation) {
    return item.id;
  }

  registerChangeInReservations() {
    this.eventSubscriber = this.eventManager.subscribe('reservationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
