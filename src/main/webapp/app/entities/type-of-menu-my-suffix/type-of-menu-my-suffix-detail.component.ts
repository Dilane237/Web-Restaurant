import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';

@Component({
  selector: 'jhi-type-of-menu-my-suffix-detail',
  templateUrl: './type-of-menu-my-suffix-detail.component.html'
})
export class TypeOfMenuMySuffixDetailComponent implements OnInit {
  typeOfMenu: ITypeOfMenuMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeOfMenu }) => {
      this.typeOfMenu = typeOfMenu;
    });
  }

  previousState() {
    window.history.back();
  }
}
