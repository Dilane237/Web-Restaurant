/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RestaurantTestModule } from '../../../test.module';
import { MenuMySuffixDeleteDialogComponent } from 'app/entities/menu-my-suffix/menu-my-suffix-delete-dialog.component';
import { MenuMySuffixService } from 'app/entities/menu-my-suffix/menu-my-suffix.service';

describe('Component Tests', () => {
  describe('MenuMySuffix Management Delete Component', () => {
    let comp: MenuMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<MenuMySuffixDeleteDialogComponent>;
    let service: MenuMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [MenuMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(MenuMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuMySuffixService);
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
