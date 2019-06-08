import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFonctionMySuffix, FonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';
import { FonctionMySuffixService } from './fonction-my-suffix.service';

@Component({
  selector: 'jhi-fonction-my-suffix-update',
  templateUrl: './fonction-my-suffix-update.component.html'
})
export class FonctionMySuffixUpdateComponent implements OnInit {
  fonction: IFonctionMySuffix;
  isSaving: boolean;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected fonctionService: FonctionMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ fonction }) => {
      this.updateForm(fonction);
      this.fonction = fonction;
    });
  }

  updateForm(fonction: IFonctionMySuffix) {
    this.editForm.patchValue({
      id: fonction.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const fonction = this.createFromForm();
    if (fonction.id !== undefined) {
      this.subscribeToSaveResponse(this.fonctionService.update(fonction));
    } else {
      this.subscribeToSaveResponse(this.fonctionService.create(fonction));
    }
  }

  private createFromForm(): IFonctionMySuffix {
    const entity = {
      ...new FonctionMySuffix(),
      id: this.editForm.get(['id']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFonctionMySuffix>>) {
    result.subscribe((res: HttpResponse<IFonctionMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
