import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';
import { AccountService } from 'app/core';
import { FonctionMySuffixService } from './fonction-my-suffix.service';

@Component({
  selector: 'jhi-fonction-my-suffix',
  templateUrl: './fonction-my-suffix.component.html'
})
export class FonctionMySuffixComponent implements OnInit, OnDestroy {
  fonctions: IFonctionMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected fonctionService: FonctionMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.fonctionService
      .query()
      .pipe(
        filter((res: HttpResponse<IFonctionMySuffix[]>) => res.ok),
        map((res: HttpResponse<IFonctionMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IFonctionMySuffix[]) => {
          this.fonctions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFonctions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFonctionMySuffix) {
    return item.id;
  }

  registerChangeInFonctions() {
    this.eventSubscriber = this.eventManager.subscribe('fonctionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
