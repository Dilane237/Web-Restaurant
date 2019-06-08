import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';
import { FonctionMySuffixService } from './fonction-my-suffix.service';

@Component({
  selector: 'jhi-fonction-my-suffix-delete-dialog',
  templateUrl: './fonction-my-suffix-delete-dialog.component.html'
})
export class FonctionMySuffixDeleteDialogComponent {
  fonction: IFonctionMySuffix;

  constructor(
    protected fonctionService: FonctionMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.fonctionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'fonctionListModification',
        content: 'Deleted an fonction'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-fonction-my-suffix-delete-popup',
  template: ''
})
export class FonctionMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fonction }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FonctionMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.fonction = fonction;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/fonction-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/fonction-my-suffix', { outlets: { popup: null } }]);
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
