/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { BillingMySuffixUpdateComponent } from 'app/entities/billing-my-suffix/billing-my-suffix-update.component';
import { BillingMySuffixService } from 'app/entities/billing-my-suffix/billing-my-suffix.service';
import { BillingMySuffix } from 'app/shared/model/billing-my-suffix.model';

describe('Component Tests', () => {
  describe('BillingMySuffix Management Update Component', () => {
    let comp: BillingMySuffixUpdateComponent;
    let fixture: ComponentFixture<BillingMySuffixUpdateComponent>;
    let service: BillingMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [BillingMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BillingMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BillingMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BillingMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BillingMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new BillingMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
