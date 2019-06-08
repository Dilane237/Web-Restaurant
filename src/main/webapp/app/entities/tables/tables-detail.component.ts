import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITables } from 'app/shared/model/tables.model';

@Component({
  selector: 'jhi-tables-detail',
  templateUrl: './tables-detail.component.html'
})
export class TablesDetailComponent implements OnInit {
  tables: ITables;

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
