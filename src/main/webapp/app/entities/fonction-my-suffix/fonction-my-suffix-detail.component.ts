import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';

@Component({
  selector: 'jhi-fonction-my-suffix-detail',
  templateUrl: './fonction-my-suffix-detail.component.html'
})
export class FonctionMySuffixDetailComponent implements OnInit {
  fonction: IFonctionMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fonction }) => {
      this.fonction = fonction;
    });
  }

  previousState() {
    window.history.back();
  }
}
