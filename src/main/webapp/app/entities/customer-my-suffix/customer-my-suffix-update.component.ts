import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICustomerMySuffix, CustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';
import { ITablesMySuffix } from 'app/shared/model/tables-my-suffix.model';
import { TablesMySuffixService } from 'app/entities/tables-my-suffix';

@Component({
  selector: 'jhi-customer-my-suffix-update',
  templateUrl: './customer-my-suffix-update.component.html'
})
export class CustomerMySuffixUpdateComponent implements OnInit {
  customer: ICustomerMySuffix;
  isSaving: boolean;

  tables: ITablesMySuffix[];

  editForm = this.fb.group({
    id: [],
    name: [],
    tables: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected customerService: CustomerMySuffixService,
    protected tablesService: TablesMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.updateForm(customer);
      this.customer = customer;
    });
    this.tablesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITablesMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITablesMySuffix[]>) => response.body)
      )
      .subscribe((res: ITablesMySuffix[]) => (this.tables = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(customer: ICustomerMySuffix) {
    this.editForm.patchValue({
      id: customer.id,
      name: customer.name,
      tables: customer.tables
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  private createFromForm(): ICustomerMySuffix {
    const entity = {
      ...new CustomerMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      tables: this.editForm.get(['tables']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerMySuffix>>) {
    result.subscribe((res: HttpResponse<ICustomerMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackTablesById(index: number, item: ITablesMySuffix) {
    return item.id;
  }
}
