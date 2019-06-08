import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBillingMySuffix } from 'app/shared/model/billing-my-suffix.model';

@Component({
  selector: 'jhi-billing-my-suffix-detail',
  templateUrl: './billing-my-suffix-detail.component.html'
})
export class BillingMySuffixDetailComponent implements OnInit {
  billing: IBillingMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ billing }) => {
      this.billing = billing;
    });
  }

  previousState() {
    window.history.back();
  }
}
