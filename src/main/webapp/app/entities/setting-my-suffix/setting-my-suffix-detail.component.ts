import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISettingMySuffix } from 'app/shared/model/setting-my-suffix.model';

@Component({
  selector: 'jhi-setting-my-suffix-detail',
  templateUrl: './setting-my-suffix-detail.component.html'
})
export class SettingMySuffixDetailComponent implements OnInit {
  setting: ISettingMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ setting }) => {
      this.setting = setting;
    });
  }

  previousState() {
    window.history.back();
  }
}
