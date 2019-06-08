import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITables } from 'app/shared/model/tables.model';
import { TablesService } from './tables.service';

@Component({
  selector: 'jhi-tables-delete-dialog',
  templateUrl: './tables-delete-dialog.component.html'
})
export class TablesDeleteDialogComponent {
  tables: ITables;

  constructor(protected tablesService: TablesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

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
  selector: 'jhi-tables-delete-popup',
  template: ''
})
export class TablesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tables }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TablesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tables = tables;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tables', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tables', { outlets: { popup: null } }]);
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
