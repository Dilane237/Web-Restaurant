/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { SettingMySuffixUpdateComponent } from 'app/entities/setting-my-suffix/setting-my-suffix-update.component';
import { SettingMySuffixService } from 'app/entities/setting-my-suffix/setting-my-suffix.service';
import { SettingMySuffix } from 'app/shared/model/setting-my-suffix.model';

describe('Component Tests', () => {
  describe('SettingMySuffix Management Update Component', () => {
    let comp: SettingMySuffixUpdateComponent;
    let fixture: ComponentFixture<SettingMySuffixUpdateComponent>;
    let service: SettingMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [SettingMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SettingMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SettingMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SettingMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SettingMySuffix(123);
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
        const entity = new SettingMySuffix();
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
