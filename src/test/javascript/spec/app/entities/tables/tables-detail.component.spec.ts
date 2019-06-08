/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { TablesDetailComponent } from 'app/entities/tables/tables-detail.component';
import { Tables } from 'app/shared/model/tables.model';

describe('Component Tests', () => {
  describe('Tables Management Detail Component', () => {
    let comp: TablesDetailComponent;
    let fixture: ComponentFixture<TablesDetailComponent>;
    const route = ({ data: of({ tables: new Tables(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TablesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TablesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TablesDetailComponent);
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
