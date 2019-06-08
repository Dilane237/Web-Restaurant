/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { MenuMySuffixDetailComponent } from 'app/entities/menu-my-suffix/menu-my-suffix-detail.component';
import { MenuMySuffix } from 'app/shared/model/menu-my-suffix.model';

describe('Component Tests', () => {
  describe('MenuMySuffix Management Detail Component', () => {
    let comp: MenuMySuffixDetailComponent;
    let fixture: ComponentFixture<MenuMySuffixDetailComponent>;
    const route = ({ data: of({ menu: new MenuMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [MenuMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MenuMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.menu).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
