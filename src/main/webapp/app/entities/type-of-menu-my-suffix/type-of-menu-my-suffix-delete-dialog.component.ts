import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';
import { TypeOfMenuMySuffixService } from './type-of-menu-my-suffix.service';

@Component({
  selector: 'jhi-type-of-menu-my-suffix-delete-dialog',
  templateUrl: './type-of-menu-my-suffix-delete-dialog.component.html'
})
export class TypeOfMenuMySuffixDeleteDialogComponent {
  typeOfMenu: ITypeOfMenuMySuffix;

  constructor(
    protected typeOfMenuService: TypeOfMenuMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.typeOfMenuService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'typeOfMenuListModification',
        content: 'Deleted an typeOfMenu'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-type-of-menu-my-suffix-delete-popup',
  template: ''
})
export class TypeOfMenuMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeOfMenu }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TypeOfMenuMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.typeOfMenu = typeOfMenu;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/type-of-menu-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/type-of-menu-my-suffix', { outlets: { popup: null } }]);
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
