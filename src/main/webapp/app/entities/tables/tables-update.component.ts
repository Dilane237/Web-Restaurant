import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITables, Tables } from 'app/shared/model/tables.model';
import { TablesService } from './tables.service';
import { ISettingMySuffix } from 'app/shared/model/setting-my-suffix.model';
import { SettingMySuffixService } from 'app/entities/setting-my-suffix';

@Component({
  selector: 'jhi-tables-update',
  templateUrl: './tables-update.component.html'
})
export class TablesUpdateComponent implements OnInit {
  tables: ITables;
  isSaving: boolean;

  settings: ISettingMySuffix[];

  editForm = this.fb.group({
    id: [],
    placesAvailable: [],
    isReserved: [],
    user: [],
    setting: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tablesService: TablesService,
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
    this.settingService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISettingMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISettingMySuffix[]>) => response.body)
      )
      .subscribe((res: ISettingMySuffix[]) => (this.settings = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tables: ITables) {
    this.editForm.patchValue({
      id: tables.id,
      placesAvailable: tables.placesAvailable,
      isReserved: tables.isReserved,
      user: tables.user,
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

  private createFromForm(): ITables {
    const entity = {
      ...new Tables(),
      id: this.editForm.get(['id']).value,
      placesAvailable: this.editForm.get(['placesAvailable']).value,
      isReserved: this.editForm.get(['isReserved']).value,
      user: this.editForm.get(['user']).value,
      setting: this.editForm.get(['setting']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITables>>) {
    result.subscribe((res: HttpResponse<ITables>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackSettingById(index: number, item: ISettingMySuffix) {
    return item.id;
  }
}
