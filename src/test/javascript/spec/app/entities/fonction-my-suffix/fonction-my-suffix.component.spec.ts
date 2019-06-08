/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { FonctionMySuffixComponent } from 'app/entities/fonction-my-suffix/fonction-my-suffix.component';
import { FonctionMySuffixService } from 'app/entities/fonction-my-suffix/fonction-my-suffix.service';
import { FonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';

describe('Component Tests', () => {
  describe('FonctionMySuffix Management Component', () => {
    let comp: FonctionMySuffixComponent;
    let fixture: ComponentFixture<FonctionMySuffixComponent>;
    let service: FonctionMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [FonctionMySuffixComponent],
        providers: []
      })
        .overrideTemplate(FonctionMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FonctionMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FonctionMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FonctionMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fonctions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
