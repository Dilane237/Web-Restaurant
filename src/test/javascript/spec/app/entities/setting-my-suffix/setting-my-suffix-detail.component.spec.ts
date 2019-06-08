/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { SettingMySuffixDetailComponent } from 'app/entities/setting-my-suffix/setting-my-suffix-detail.component';
import { SettingMySuffix } from 'app/shared/model/setting-my-suffix.model';

describe('Component Tests', () => {
  describe('SettingMySuffix Management Detail Component', () => {
    let comp: SettingMySuffixDetailComponent;
    let fixture: ComponentFixture<SettingMySuffixDetailComponent>;
    const route = ({ data: of({ setting: new SettingMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [SettingMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SettingMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SettingMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.setting).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
