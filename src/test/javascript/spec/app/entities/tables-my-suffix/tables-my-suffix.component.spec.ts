/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { TablesMySuffixComponent } from 'app/entities/tables-my-suffix/tables-my-suffix.component';
import { TablesMySuffixService } from 'app/entities/tables-my-suffix/tables-my-suffix.service';
import { TablesMySuffix } from 'app/shared/model/tables-my-suffix.model';

describe('Component Tests', () => {
  describe('TablesMySuffix Management Component', () => {
    let comp: TablesMySuffixComponent;
    let fixture: ComponentFixture<TablesMySuffixComponent>;
    let service: TablesMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TablesMySuffixComponent],
        providers: []
      })
        .overrideTemplate(TablesMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TablesMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TablesMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TablesMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
