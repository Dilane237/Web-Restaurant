/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { BillingMySuffixComponent } from 'app/entities/billing-my-suffix/billing-my-suffix.component';
import { BillingMySuffixService } from 'app/entities/billing-my-suffix/billing-my-suffix.service';
import { BillingMySuffix } from 'app/shared/model/billing-my-suffix.model';

describe('Component Tests', () => {
  describe('BillingMySuffix Management Component', () => {
    let comp: BillingMySuffixComponent;
    let fixture: ComponentFixture<BillingMySuffixComponent>;
    let service: BillingMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [BillingMySuffixComponent],
        providers: []
      })
        .overrideTemplate(BillingMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BillingMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BillingMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BillingMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.billings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
