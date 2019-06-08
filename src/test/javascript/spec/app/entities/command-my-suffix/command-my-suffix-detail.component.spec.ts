/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { CommandMySuffixDetailComponent } from 'app/entities/command-my-suffix/command-my-suffix-detail.component';
import { CommandMySuffix } from 'app/shared/model/command-my-suffix.model';

describe('Component Tests', () => {
  describe('CommandMySuffix Management Detail Component', () => {
    let comp: CommandMySuffixDetailComponent;
    let fixture: ComponentFixture<CommandMySuffixDetailComponent>;
    const route = ({ data: of({ command: new CommandMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [CommandMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CommandMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommandMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.command).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
