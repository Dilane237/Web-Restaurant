/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestaurantTestModule } from '../../../test.module';
import { CommandMySuffixComponent } from 'app/entities/command-my-suffix/command-my-suffix.component';
import { CommandMySuffixService } from 'app/entities/command-my-suffix/command-my-suffix.service';
import { CommandMySuffix } from 'app/shared/model/command-my-suffix.model';

describe('Component Tests', () => {
  describe('CommandMySuffix Management Component', () => {
    let comp: CommandMySuffixComponent;
    let fixture: ComponentFixture<CommandMySuffixComponent>;
    let service: CommandMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [CommandMySuffixComponent],
        providers: []
      })
        .overrideTemplate(CommandMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommandMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommandMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CommandMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.commands[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
