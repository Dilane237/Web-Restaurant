import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITablesMySuffix } from 'app/shared/model/tables-my-suffix.model';
import { TablesMySuffixService } from './tables-my-suffix.service';

@Component({
  selector: 'jhi-tables-my-suffix-delete-dialog',
  templateUrl: './tables-my-suffix-delete-dialog.component.html'
})
export class TablesMySuffixDeleteDialogComponent {
  tables: ITablesMySuffix;

  constructor(
    protected tablesService: TablesMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tablesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tablesListModification',
        content: 'Deleted an tables'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tables-my-suffix-delete-popup',
  template: ''
})
export class TablesMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tables }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TablesMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tables = tables;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tables-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tables-my-suffix', { outlets: { popup: null } }]);
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
