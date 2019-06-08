import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISettingMySuffix, SettingMySuffix } from 'app/shared/model/setting-my-suffix.model';
import { SettingMySuffixService } from './setting-my-suffix.service';

@Component({
  selector: 'jhi-setting-my-suffix-update',
  templateUrl: './setting-my-suffix-update.component.html'
})
export class SettingMySuffixUpdateComponent implements OnInit {
  setting: ISettingMySuffix;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    restaurantName: [],
    numberOfTable: [],
    address: [],
    phoneNumber: [],
    numberPersonTable: []
  });

  constructor(protected settingService: SettingMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ setting }) => {
      this.updateForm(setting);
      this.setting = setting;
    });
  }

  updateForm(setting: ISettingMySuffix) {
    this.editForm.patchValue({
      id: setting.id,
      restaurantName: setting.restaurantName,
      numberOfTable: setting.numberOfTable,
      address: setting.address,
      phoneNumber: setting.phoneNumber,
      numberPersonTable: setting.numberPersonTable
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const setting = this.createFromForm();
    if (setting.id !== undefined) {
      this.subscribeToSaveResponse(this.settingService.update(setting));
    } else {
      this.subscribeToSaveResponse(this.settingService.create(setting));
    }
  }

  private createFromForm(): ISettingMySuffix {
    const entity = {
      ...new SettingMySuffix(),
      id: this.editForm.get(['id']).value,
      restaurantName: this.editForm.get(['restaurantName']).value,
      numberOfTable: this.editForm.get(['numberOfTable']).value,
      address: this.editForm.get(['address']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      numberPersonTable: this.editForm.get(['numberPersonTable']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISettingMySuffix>>) {
    result.subscribe((res: HttpResponse<ISettingMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
