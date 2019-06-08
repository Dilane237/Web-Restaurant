/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { FonctionMySuffixUpdateComponent } from 'app/entities/fonction-my-suffix/fonction-my-suffix-update.component';
import { FonctionMySuffixService } from 'app/entities/fonction-my-suffix/fonction-my-suffix.service';
import { FonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';

describe('Component Tests', () => {
  describe('FonctionMySuffix Management Update Component', () => {
    let comp: FonctionMySuffixUpdateComponent;
    let fixture: ComponentFixture<FonctionMySuffixUpdateComponent>;
    let service: FonctionMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [FonctionMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FonctionMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FonctionMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FonctionMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FonctionMySuffix(123);
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
        const entity = new FonctionMySuffix();
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
