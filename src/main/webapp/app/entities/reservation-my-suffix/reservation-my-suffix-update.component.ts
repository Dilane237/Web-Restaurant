import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IReservationMySuffix, ReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';
import { ReservationMySuffixService } from './reservation-my-suffix.service';

@Component({
  selector: 'jhi-reservation-my-suffix-update',
  templateUrl: './reservation-my-suffix-update.component.html'
})
export class ReservationMySuffixUpdateComponent implements OnInit {
  reservation: IReservationMySuffix;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    reservedAt: [],
    reservationTime: []
  });

  constructor(
    protected reservationService: ReservationMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reservation }) => {
      this.updateForm(reservation);
      this.reservation = reservation;
    });
  }

  updateForm(reservation: IReservationMySuffix) {
    this.editForm.patchValue({
      id: reservation.id,
      name: reservation.name,
      reservedAt: reservation.reservedAt != null ? reservation.reservedAt.format(DATE_TIME_FORMAT) : null,
      reservationTime: reservation.reservationTime != null ? reservation.reservationTime.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reservation = this.createFromForm();
    if (reservation.id !== undefined) {
      this.subscribeToSaveResponse(this.reservationService.update(reservation));
    } else {
      this.subscribeToSaveResponse(this.reservationService.create(reservation));
    }
  }

  private createFromForm(): IReservationMySuffix {
    const entity = {
      ...new ReservationMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      reservedAt:
        this.editForm.get(['reservedAt']).value != null ? moment(this.editForm.get(['reservedAt']).value, DATE_TIME_FORMAT) : undefined,
      reservationTime:
        this.editForm.get(['reservationTime']).value != null
          ? moment(this.editForm.get(['reservationTime']).value, DATE_TIME_FORMAT)
          : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservationMySuffix>>) {
    result.subscribe((res: HttpResponse<IReservationMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
