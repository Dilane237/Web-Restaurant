/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { MenuMySuffixUpdateComponent } from 'app/entities/menu-my-suffix/menu-my-suffix-update.component';
import { MenuMySuffixService } from 'app/entities/menu-my-suffix/menu-my-suffix.service';
import { MenuMySuffix } from 'app/shared/model/menu-my-suffix.model';

describe('Component Tests', () => {
  describe('MenuMySuffix Management Update Component', () => {
    let comp: MenuMySuffixUpdateComponent;
    let fixture: ComponentFixture<MenuMySuffixUpdateComponent>;
    let service: MenuMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [MenuMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MenuMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MenuMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MenuMySuffix(123);
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
        const entity = new MenuMySuffix();
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
