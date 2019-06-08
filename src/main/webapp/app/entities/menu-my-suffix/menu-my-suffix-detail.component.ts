import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenuMySuffix } from 'app/shared/model/menu-my-suffix.model';

@Component({
  selector: 'jhi-menu-my-suffix-detail',
  templateUrl: './menu-my-suffix-detail.component.html'
})
export class MenuMySuffixDetailComponent implements OnInit {
  menu: IMenuMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ menu }) => {
      this.menu = menu;
    });
  }

  previousState() {
    window.history.back();
  }
}
