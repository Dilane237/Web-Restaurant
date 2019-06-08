import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICommandMySuffix, CommandMySuffix } from 'app/shared/model/command-my-suffix.model';
import { CommandMySuffixService } from './command-my-suffix.service';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix';

@Component({
  selector: 'jhi-command-my-suffix-update',
  templateUrl: './command-my-suffix-update.component.html'
})
export class CommandMySuffixUpdateComponent implements OnInit {
  command: ICommandMySuffix;
  isSaving: boolean;

  customers: ICustomerMySuffix[];

  editForm = this.fb.group({
    id: [],
    commandAt: [],
    quantity: [],
    serve: [],
    customer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected commandService: CommandMySuffixService,
    protected customerService: CustomerMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ command }) => {
      this.updateForm(command);
      this.command = command;
    });
    this.customerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICustomerMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICustomerMySuffix[]>) => response.body)
      )
      .subscribe((res: ICustomerMySuffix[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(command: ICommandMySuffix) {
    this.editForm.patchValue({
      id: command.id,
      commandAt: command.commandAt != null ? command.commandAt.format(DATE_TIME_FORMAT) : null,
      quantity: command.quantity,
      serve: command.serve,
      customer: command.customer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const command = this.createFromForm();
    if (command.id !== undefined) {
      this.subscribeToSaveResponse(this.commandService.update(command));
    } else {
      this.subscribeToSaveResponse(this.commandService.create(command));
    }
  }

  private createFromForm(): ICommandMySuffix {
    const entity = {
      ...new CommandMySuffix(),
      id: this.editForm.get(['id']).value,
      commandAt:
        this.editForm.get(['commandAt']).value != null ? moment(this.editForm.get(['commandAt']).value, DATE_TIME_FORMAT) : undefined,
      quantity: this.editForm.get(['quantity']).value,
      serve: this.editForm.get(['serve']).value,
      customer: this.editForm.get(['customer']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommandMySuffix>>) {
    result.subscribe((res: HttpResponse<ICommandMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
