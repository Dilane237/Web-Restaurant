/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { TablesMySuffixUpdateComponent } from 'app/entities/tables-my-suffix/tables-my-suffix-update.component';
import { TablesMySuffixService } from 'app/entities/tables-my-suffix/tables-my-suffix.service';
import { TablesMySuffix } from 'app/shared/model/tables-my-suffix.model';

describe('Component Tests', () => {
  describe('TablesMySuffix Management Update Component', () => {
    let comp: TablesMySuffixUpdateComponent;
    let fixture: ComponentFixture<TablesMySuffixUpdateComponent>;
    let service: TablesMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TablesMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TablesMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TablesMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TablesMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TablesMySuffix(123);
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
        const entity = new TablesMySuffix();
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
