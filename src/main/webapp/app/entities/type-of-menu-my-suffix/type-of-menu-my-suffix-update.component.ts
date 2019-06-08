import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITypeOfMenuMySuffix, TypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';
import { TypeOfMenuMySuffixService } from './type-of-menu-my-suffix.service';

@Component({
  selector: 'jhi-type-of-menu-my-suffix-update',
  templateUrl: './type-of-menu-my-suffix-update.component.html'
})
export class TypeOfMenuMySuffixUpdateComponent implements OnInit {
  typeOfMenu: ITypeOfMenuMySuffix;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected typeOfMenuService: TypeOfMenuMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ typeOfMenu }) => {
      this.updateForm(typeOfMenu);
      this.typeOfMenu = typeOfMenu;
    });
  }

  updateForm(typeOfMenu: ITypeOfMenuMySuffix) {
    this.editForm.patchValue({
      id: typeOfMenu.id,
      name: typeOfMenu.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const typeOfMenu = this.createFromForm();
    if (typeOfMenu.id !== undefined) {
      this.subscribeToSaveResponse(this.typeOfMenuService.update(typeOfMenu));
    } else {
      this.subscribeToSaveResponse(this.typeOfMenuService.create(typeOfMenu));
    }
  }

  private createFromForm(): ITypeOfMenuMySuffix {
    const entity = {
      ...new TypeOfMenuMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeOfMenuMySuffix>>) {
    result.subscribe((res: HttpResponse<ITypeOfMenuMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
