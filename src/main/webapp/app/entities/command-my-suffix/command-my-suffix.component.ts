import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';
import { AccountService } from 'app/core';
import { CommandMySuffixService } from './command-my-suffix.service';

@Component({
  selector: 'jhi-command-my-suffix',
  templateUrl: './command-my-suffix.component.html'
})
export class CommandMySuffixComponent implements OnInit, OnDestroy {
  commands: ICommandMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected commandService: CommandMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.commandService
      .query()
      .pipe(
        filter((res: HttpResponse<ICommandMySuffix[]>) => res.ok),
        map((res: HttpResponse<ICommandMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ICommandMySuffix[]) => {
          this.commands = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCommands();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICommandMySuffix) {
    return item.id;
  }

  registerChangeInCommands() {
    this.eventSubscriber = this.eventManager.subscribe('commandListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
