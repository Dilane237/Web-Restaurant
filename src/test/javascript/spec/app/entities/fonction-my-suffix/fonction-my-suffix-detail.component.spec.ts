/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { FonctionMySuffixDetailComponent } from 'app/entities/fonction-my-suffix/fonction-my-suffix-detail.component';
import { FonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';

describe('Component Tests', () => {
  describe('FonctionMySuffix Management Detail Component', () => {
    let comp: FonctionMySuffixDetailComponent;
    let fixture: ComponentFixture<FonctionMySuffixDetailComponent>;
    const route = ({ data: of({ fonction: new FonctionMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [FonctionMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FonctionMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FonctionMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fonction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
