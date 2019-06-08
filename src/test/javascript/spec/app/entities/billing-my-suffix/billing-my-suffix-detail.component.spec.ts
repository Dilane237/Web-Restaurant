/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { BillingMySuffixDetailComponent } from 'app/entities/billing-my-suffix/billing-my-suffix-detail.component';
import { BillingMySuffix } from 'app/shared/model/billing-my-suffix.model';

describe('Component Tests', () => {
  describe('BillingMySuffix Management Detail Component', () => {
    let comp: BillingMySuffixDetailComponent;
    let fixture: ComponentFixture<BillingMySuffixDetailComponent>;
    const route = ({ data: of({ billing: new BillingMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [BillingMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BillingMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BillingMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.billing).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
