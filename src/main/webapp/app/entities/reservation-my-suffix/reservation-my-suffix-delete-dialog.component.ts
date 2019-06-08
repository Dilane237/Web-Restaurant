import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';
import { ReservationMySuffixService } from './reservation-my-suffix.service';

@Component({
  selector: 'jhi-reservation-my-suffix-delete-dialog',
  templateUrl: './reservation-my-suffix-delete-dialog.component.html'
})
export class ReservationMySuffixDeleteDialogComponent {
  reservation: IReservationMySuffix;

  constructor(
    protected reservationService: ReservationMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reservationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reservationListModification',
        content: 'Deleted an reservation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reservation-my-suffix-delete-popup',
  template: ''
})
export class ReservationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reservation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReservationMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.reservation = reservation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reservation-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reservation-my-suffix', { outlets: { popup: null } }]);
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
