import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IReservation, Reservation } from 'app/shared/model/reservation.model';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'jhi-reservation-update',
  templateUrl: './reservation-update.component.html'
})
export class ReservationUpdateComponent implements OnInit {
  reservation: IReservation;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    tables: [],
    reservedAt: [],
    reservationTime: []
  });

  constructor(protected reservationService: ReservationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reservation }) => {
      this.updateForm(reservation);
      this.reservation = reservation;
    });
  }

  updateForm(reservation: IReservation) {
    this.editForm.patchValue({
      id: reservation.id,
      name: reservation.name,
      tables: reservation.tables,
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

  private createFromForm(): IReservation {
    const entity = {
      ...new Reservation(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      tables: this.editForm.get(['tables']).value,
      reservedAt:
        this.editForm.get(['reservedAt']).value != null ? moment(this.editForm.get(['reservedAt']).value, DATE_TIME_FORMAT) : undefined,
      reservationTime:
        this.editForm.get(['reservationTime']).value != null
          ? moment(this.editForm.get(['reservationTime']).value, DATE_TIME_FORMAT)
          : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservation>>) {
    result.subscribe((res: HttpResponse<IReservation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
