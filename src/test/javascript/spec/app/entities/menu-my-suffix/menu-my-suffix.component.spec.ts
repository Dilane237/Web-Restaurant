/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { MenuMySuffixComponent } from 'app/entities/menu-my-suffix/menu-my-suffix.component';
import { MenuMySuffixService } from 'app/entities/menu-my-suffix/menu-my-suffix.service';
import { MenuMySuffix } from 'app/shared/model/menu-my-suffix.model';

describe('Component Tests', () => {
  describe('MenuMySuffix Management Component', () => {
    let comp: MenuMySuffixComponent;
    let fixture: ComponentFixture<MenuMySuffixComponent>;
    let service: MenuMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [MenuMySuffixComponent],
        providers: []
      })
        .overrideTemplate(MenuMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MenuMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MenuMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.menus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
