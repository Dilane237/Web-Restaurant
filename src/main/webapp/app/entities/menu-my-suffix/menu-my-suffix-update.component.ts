import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMenuMySuffix, MenuMySuffix } from 'app/shared/model/menu-my-suffix.model';
import { MenuMySuffixService } from './menu-my-suffix.service';
import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';
import { CommandMySuffixService } from 'app/entities/command-my-suffix';
import { ITypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';
import { TypeOfMenuMySuffixService } from 'app/entities/type-of-menu-my-suffix';

@Component({
  selector: 'jhi-menu-my-suffix-update',
  templateUrl: './menu-my-suffix-update.component.html'
})
export class MenuMySuffixUpdateComponent implements OnInit {
  menu: IMenuMySuffix;
  isSaving: boolean;

  commands: ICommandMySuffix[];

  typeofmenus: ITypeOfMenuMySuffix[];

  editForm = this.fb.group({
    id: [],
    name: [],
    image: [],
    price: [],
    command: [],
    typeOfMenu: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected menuService: MenuMySuffixService,
    protected commandService: CommandMySuffixService,
    protected typeOfMenuService: TypeOfMenuMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ menu }) => {
      this.updateForm(menu);
      this.menu = menu;
    });
    this.commandService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommandMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommandMySuffix[]>) => response.body)
      )
      .subscribe((res: ICommandMySuffix[]) => (this.commands = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.typeOfMenuService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITypeOfMenuMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITypeOfMenuMySuffix[]>) => response.body)
      )
      .subscribe((res: ITypeOfMenuMySuffix[]) => (this.typeofmenus = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(menu: IMenuMySuffix) {
    this.editForm.patchValue({
      id: menu.id,
      name: menu.name,
      image: menu.image,
      price: menu.price,
      command: menu.command,
      typeOfMenu: menu.typeOfMenu
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const menu = this.createFromForm();
    if (menu.id !== undefined) {
      this.subscribeToSaveResponse(this.menuService.update(menu));
    } else {
      this.subscribeToSaveResponse(this.menuService.create(menu));
    }
  }

  private createFromForm(): IMenuMySuffix {
    const entity = {
      ...new MenuMySuffix(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      image: this.editForm.get(['image']).value,
      price: this.editForm.get(['price']).value,
      command: this.editForm.get(['command']).value,
      typeOfMenu: this.editForm.get(['typeOfMenu']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuMySuffix>>) {
    result.subscribe((res: HttpResponse<IMenuMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCommandById(index: number, item: ICommandMySuffix) {
    return item.id;
  }

  trackTypeOfMenuById(index: number, item: ITypeOfMenuMySuffix) {
    return item.id;
  }
}
