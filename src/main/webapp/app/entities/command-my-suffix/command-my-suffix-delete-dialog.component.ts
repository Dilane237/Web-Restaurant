import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';
import { CommandMySuffixService } from './command-my-suffix.service';

@Component({
  selector: 'jhi-command-my-suffix-delete-dialog',
  templateUrl: './command-my-suffix-delete-dialog.component.html'
})
export class CommandMySuffixDeleteDialogComponent {
  command: ICommandMySuffix;

  constructor(
    protected commandService: CommandMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.commandService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'commandListModification',
        content: 'Deleted an command'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-command-my-suffix-delete-popup',
  template: ''
})
export class CommandMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ command }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CommandMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.command = command;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/command-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/command-my-suffix', { outlets: { popup: null } }]);
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
