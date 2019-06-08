import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBillingMySuffix, BillingMySuffix } from 'app/shared/model/billing-my-suffix.model';
import { BillingMySuffixService } from './billing-my-suffix.service';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix';
import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';
import { CommandMySuffixService } from 'app/entities/command-my-suffix';

@Component({
  selector: 'jhi-billing-my-suffix-update',
  templateUrl: './billing-my-suffix-update.component.html'
})
export class BillingMySuffixUpdateComponent implements OnInit {
  billing: IBillingMySuffix;
  isSaving: boolean;

  customers: ICustomerMySuffix[];

  commands: ICommandMySuffix[];

  editForm = this.fb.group({
    id: [],
    totalPrice: [],
    status: [],
    customer: [],
    command: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected billingService: BillingMySuffixService,
    protected customerService: CustomerMySuffixService,
    protected commandService: CommandMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ billing }) => {
      this.updateForm(billing);
      this.billing = billing;
    });
    this.customerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICustomerMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICustomerMySuffix[]>) => response.body)
      )
      .subscribe((res: ICustomerMySuffix[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.commandService
      .query({ filter: 'billing-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICommandMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommandMySuffix[]>) => response.body)
      )
      .subscribe(
        (res: ICommandMySuffix[]) => {
          if (!this.billing.command || !this.billing.command.id) {
            this.commands = res;
          } else {
            this.commandService
              .find(this.billing.command.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICommandMySuffix>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICommandMySuffix>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICommandMySuffix) => (this.commands = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(billing: IBillingMySuffix) {
    this.editForm.patchValue({
      id: billing.id,
      totalPrice: billing.totalPrice,
      status: billing.status,
      customer: billing.customer,
      command: billing.command
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const billing = this.createFromForm();
    if (billing.id !== undefined) {
      this.subscribeToSaveResponse(this.billingService.update(billing));
    } else {
      this.subscribeToSaveResponse(this.billingService.create(billing));
    }
  }

  private createFromForm(): IBillingMySuffix {
    const entity = {
      ...new BillingMySuffix(),
      id: this.editForm.get(['id']).value,
      totalPrice: this.editForm.get(['totalPrice']).value,
      status: this.editForm.get(['status']).value,
      customer: this.editForm.get(['customer']).value,
      command: this.editForm.get(['command']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBillingMySuffix>>) {
    result.subscribe((res: HttpResponse<IBillingMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackCustomerById(index: number, item: ICustomerMySuffix) {
    return item.id;
  }

  trackCommandById(index: number, item: ICommandMySuffix) {
    return item.id;
  }
}
