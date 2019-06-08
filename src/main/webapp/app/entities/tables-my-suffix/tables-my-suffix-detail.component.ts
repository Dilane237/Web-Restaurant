import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITablesMySuffix } from 'app/shared/model/tables-my-suffix.model';

@Component({
  selector: 'jhi-tables-my-suffix-detail',
  templateUrl: './tables-my-suffix-detail.component.html'
})
export class TablesMySuffixDetailComponent implements OnInit {
  tables: ITablesMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tables }) => {
      this.tables = tables;
    });
  }

  previousState() {
    window.history.back();
  }
}
