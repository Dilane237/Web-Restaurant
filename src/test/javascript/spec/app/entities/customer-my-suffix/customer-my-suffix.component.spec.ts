/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { CustomerMySuffixComponent } from 'app/entities/customer-my-suffix/customer-my-suffix.component';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix/customer-my-suffix.service';
import { CustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';

describe('Component Tests', () => {
  describe('CustomerMySuffix Management Component', () => {
    let comp: CustomerMySuffixComponent;
    let fixture: ComponentFixture<CustomerMySuffixComponent>;
    let service: CustomerMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [CustomerMySuffixComponent],
        providers: []
      })
        .overrideTemplate(CustomerMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
