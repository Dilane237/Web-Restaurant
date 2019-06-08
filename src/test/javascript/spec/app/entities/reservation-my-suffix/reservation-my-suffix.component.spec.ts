/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { ReservationMySuffixComponent } from 'app/entities/reservation-my-suffix/reservation-my-suffix.component';
import { ReservationMySuffixService } from 'app/entities/reservation-my-suffix/reservation-my-suffix.service';
import { ReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';

describe('Component Tests', () => {
  describe('ReservationMySuffix Management Component', () => {
    let comp: ReservationMySuffixComponent;
    let fixture: ComponentFixture<ReservationMySuffixComponent>;
    let service: ReservationMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [ReservationMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ReservationMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReservationMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReservationMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReservationMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reservations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
