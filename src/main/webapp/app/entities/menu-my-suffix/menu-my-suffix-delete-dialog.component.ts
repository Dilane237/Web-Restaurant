import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMenuMySuffix } from 'app/shared/model/menu-my-suffix.model';
import { MenuMySuffixService } from './menu-my-suffix.service';

@Component({
  selector: 'jhi-menu-my-suffix-delete-dialog',
  templateUrl: './menu-my-suffix-delete-dialog.component.html'
})
export class MenuMySuffixDeleteDialogComponent {
  menu: IMenuMySuffix;

  constructor(protected menuService: MenuMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.menuService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'menuListModification',
        content: 'Deleted an menu'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-menu-my-suffix-delete-popup',
  template: ''
})
export class MenuMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ menu }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MenuMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.menu = menu;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/menu-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/menu-my-suffix', { outlets: { popup: null } }]);
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
