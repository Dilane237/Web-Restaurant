import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITablesMySuffix, TablesMySuffix } from 'app/shared/model/tables-my-suffix.model';
import { TablesMySuffixService } from './tables-my-suffix.service';
import { IReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';
import { ReservationMySuffixService } from 'app/entities/reservation-my-suffix';
import { ISettingMySuffix } from 'app/shared/model/setting-my-suffix.model';
import { SettingMySuffixService } from 'app/entities/setting-my-suffix';

@Component({
  selector: 'jhi-tables-my-suffix-update',
  templateUrl: './tables-my-suffix-update.component.html'
})
export class TablesMySuffixUpdateComponent implements OnInit {
  tables: ITablesMySuffix;
  isSaving: boolean;

  reservations: IReservationMySuffix[];

  settings: ISettingMySuffix[];

  editForm = this.fb.group({
    id: [],
    placesAvailable: [],
    isReserved: [],
    user: [],
    reservation: [],
    setting: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tablesService: TablesMySuffixService,
    protected reservationService: ReservationMySuffixService,
    protected settingService: SettingMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tables }) => {
      this.updateForm(tables);
      this.tables = tables;
    });
    this.reservationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IReservationMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IReservationMySuffix[]>) => response.body)
      )
      .subscribe((res: IReservationMySuffix[]) => (this.reservations = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.settingService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISettingMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISettingMySuffix[]>) => response.body)
      )
      .subscribe((res: ISettingMySuffix[]) => (this.settings = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tables: ITablesMySuffix) {
    this.editForm.patchValue({
      id: tables.id,
      placesAvailable: tables.placesAvailable,
      isReserved: tables.isReserved,
      user: tables.user,
      reservation: tables.reservation,
      setting: tables.setting
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tables = this.createFromForm();
    if (tables.id !== undefined) {
      this.subscribeToSaveResponse(this.tablesService.update(tables));
    } else {
      this.subscribeToSaveResponse(this.tablesService.create(tables));
    }
  }

  private createFromForm(): ITablesMySuffix {
    const entity = {
      ...new TablesMySuffix(),
      id: this.editForm.get(['id']).value,
      placesAvailable: this.editForm.get(['placesAvailable']).value,
      isReserved: this.editForm.get(['isReserved']).value,
      user: this.editForm.get(['user']).value,
      reservation: this.editForm.get(['reservation']).value,
      setting: this.editForm.get(['setting']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITablesMySuffix>>) {
    result.subscribe((res: HttpResponse<ITablesMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackReservationById(index: number, item: IReservationMySuffix) {
    return item.id;
  }

  trackSettingById(index: number, item: ISettingMySuffix) {
    return item.id;
  }
}
