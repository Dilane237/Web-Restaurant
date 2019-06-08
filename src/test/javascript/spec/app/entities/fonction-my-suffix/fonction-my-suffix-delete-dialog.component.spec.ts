/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RestaurantTestModule } from '../../../test.module';
import { FonctionMySuffixDeleteDialogComponent } from 'app/entities/fonction-my-suffix/fonction-my-suffix-delete-dialog.component';
import { FonctionMySuffixService } from 'app/entities/fonction-my-suffix/fonction-my-suffix.service';

describe('Component Tests', () => {
  describe('FonctionMySuffix Management Delete Component', () => {
    let comp: FonctionMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<FonctionMySuffixDeleteDialogComponent>;
    let service: FonctionMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [FonctionMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(FonctionMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FonctionMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FonctionMySuffixService);
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
