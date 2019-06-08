/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RestaurantTestModule } from '../../../test.module';
import { TablesMySuffixDeleteDialogComponent } from 'app/entities/tables-my-suffix/tables-my-suffix-delete-dialog.component';
import { TablesMySuffixService } from 'app/entities/tables-my-suffix/tables-my-suffix.service';

describe('Component Tests', () => {
  describe('TablesMySuffix Management Delete Component', () => {
    let comp: TablesMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<TablesMySuffixDeleteDialogComponent>;
    let service: TablesMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TablesMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(TablesMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TablesMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TablesMySuffixService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
