/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { TablesMySuffixDetailComponent } from 'app/entities/tables-my-suffix/tables-my-suffix-detail.component';
import { TablesMySuffix } from 'app/shared/model/tables-my-suffix.model';

describe('Component Tests', () => {
  describe('TablesMySuffix Management Detail Component', () => {
    let comp: TablesMySuffixDetailComponent;
    let fixture: ComponentFixture<TablesMySuffixDetailComponent>;
    const route = ({ data: of({ tables: new TablesMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TablesMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TablesMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TablesMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tables).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
