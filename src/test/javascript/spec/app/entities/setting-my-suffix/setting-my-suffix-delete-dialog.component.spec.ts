/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RestaurantTestModule } from '../../../test.module';
import { SettingMySuffixDeleteDialogComponent } from 'app/entities/setting-my-suffix/setting-my-suffix-delete-dialog.component';
import { SettingMySuffixService } from 'app/entities/setting-my-suffix/setting-my-suffix.service';

describe('Component Tests', () => {
  describe('SettingMySuffix Management Delete Component', () => {
    let comp: SettingMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<SettingMySuffixDeleteDialogComponent>;
    let service: SettingMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [SettingMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(SettingMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SettingMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SettingMySuffixService);
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
