/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { TypeOfMenuMySuffixDetailComponent } from 'app/entities/type-of-menu-my-suffix/type-of-menu-my-suffix-detail.component';
import { TypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';

describe('Component Tests', () => {
  describe('TypeOfMenuMySuffix Management Detail Component', () => {
    let comp: TypeOfMenuMySuffixDetailComponent;
    let fixture: ComponentFixture<TypeOfMenuMySuffixDetailComponent>;
    const route = ({ data: of({ typeOfMenu: new TypeOfMenuMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TypeOfMenuMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TypeOfMenuMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeOfMenuMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.typeOfMenu).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
