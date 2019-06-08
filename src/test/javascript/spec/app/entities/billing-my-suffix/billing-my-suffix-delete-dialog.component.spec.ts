/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RestaurantTestModule } from '../../../test.module';
import { BillingMySuffixDeleteDialogComponent } from 'app/entities/billing-my-suffix/billing-my-suffix-delete-dialog.component';
import { BillingMySuffixService } from 'app/entities/billing-my-suffix/billing-my-suffix.service';

describe('Component Tests', () => {
  describe('BillingMySuffix Management Delete Component', () => {
    let comp: BillingMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<BillingMySuffixDeleteDialogComponent>;
    let service: BillingMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [BillingMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(BillingMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BillingMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BillingMySuffixService);
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
