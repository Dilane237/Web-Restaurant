/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { TypeOfMenuMySuffixComponent } from 'app/entities/type-of-menu-my-suffix/type-of-menu-my-suffix.component';
import { TypeOfMenuMySuffixService } from 'app/entities/type-of-menu-my-suffix/type-of-menu-my-suffix.service';
import { TypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';

describe('Component Tests', () => {
  describe('TypeOfMenuMySuffix Management Component', () => {
    let comp: TypeOfMenuMySuffixComponent;
    let fixture: ComponentFixture<TypeOfMenuMySuffixComponent>;
    let service: TypeOfMenuMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TypeOfMenuMySuffixComponent],
        providers: []
      })
        .overrideTemplate(TypeOfMenuMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeOfMenuMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeOfMenuMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TypeOfMenuMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.typeOfMenus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
