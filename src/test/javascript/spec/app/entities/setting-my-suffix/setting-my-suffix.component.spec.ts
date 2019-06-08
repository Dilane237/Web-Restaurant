/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { SettingMySuffixComponent } from 'app/entities/setting-my-suffix/setting-my-suffix.component';
import { SettingMySuffixService } from 'app/entities/setting-my-suffix/setting-my-suffix.service';
import { SettingMySuffix } from 'app/shared/model/setting-my-suffix.model';

describe('Component Tests', () => {
  describe('SettingMySuffix Management Component', () => {
    let comp: SettingMySuffixComponent;
    let fixture: ComponentFixture<SettingMySuffixComponent>;
    let service: SettingMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [SettingMySuffixComponent],
        providers: []
      })
        .overrideTemplate(SettingMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SettingMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SettingMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SettingMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.settings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
