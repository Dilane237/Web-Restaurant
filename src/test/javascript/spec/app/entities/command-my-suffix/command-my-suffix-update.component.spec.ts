/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { CommandMySuffixUpdateComponent } from 'app/entities/command-my-suffix/command-my-suffix-update.component';
import { CommandMySuffixService } from 'app/entities/command-my-suffix/command-my-suffix.service';
import { CommandMySuffix } from 'app/shared/model/command-my-suffix.model';

describe('Component Tests', () => {
  describe('CommandMySuffix Management Update Component', () => {
    let comp: CommandMySuffixUpdateComponent;
    let fixture: ComponentFixture<CommandMySuffixUpdateComponent>;
    let service: CommandMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [CommandMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CommandMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommandMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommandMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CommandMySuffix(123);
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
        const entity = new CommandMySuffix();
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
