import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBillingMySuffix } from 'app/shared/model/billing-my-suffix.model';
import { BillingMySuffixService } from './billing-my-suffix.service';

@Component({
  selector: 'jhi-billing-my-suffix-delete-dialog',
  templateUrl: './billing-my-suffix-delete-dialog.component.html'
})
export class BillingMySuffixDeleteDialogComponent {
  billing: IBillingMySuffix;

  constructor(
    protected billingService: BillingMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.billingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'billingListModification',
        content: 'Deleted an billing'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-billing-my-suffix-delete-popup',
  template: ''
})
export class BillingMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ billing }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BillingMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.billing = billing;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/billing-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/billing-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
