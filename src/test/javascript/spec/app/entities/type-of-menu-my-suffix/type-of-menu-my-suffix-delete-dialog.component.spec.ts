/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RestaurantTestModule } from '../../../test.module';
import { TypeOfMenuMySuffixDeleteDialogComponent } from 'app/entities/type-of-menu-my-suffix/type-of-menu-my-suffix-delete-dialog.component';
import { TypeOfMenuMySuffixService } from 'app/entities/type-of-menu-my-suffix/type-of-menu-my-suffix.service';

describe('Component Tests', () => {
  describe('TypeOfMenuMySuffix Management Delete Component', () => {
    let comp: TypeOfMenuMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<TypeOfMenuMySuffixDeleteDialogComponent>;
    let service: TypeOfMenuMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TypeOfMenuMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(TypeOfMenuMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeOfMenuMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeOfMenuMySuffixService);
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
