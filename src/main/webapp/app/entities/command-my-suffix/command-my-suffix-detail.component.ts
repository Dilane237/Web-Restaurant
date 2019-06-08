import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';

@Component({
  selector: 'jhi-command-my-suffix-detail',
  templateUrl: './command-my-suffix-detail.component.html'
})
export class CommandMySuffixDetailComponent implements OnInit {
  command: ICommandMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ command }) => {
      this.command = command;
    });
  }

  previousState() {
    window.history.back();
  }
}
