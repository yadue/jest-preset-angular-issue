import { Component } from '@angular/core';

import { hasPath } from 'lodash-es';
import { Bind } from 'lodash-decorators-esm';
import { format } from 'date-fns';
import { LOCALES } from '../../locales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jest-preset-issue';

  constructor() {
    console.log('hasPath', hasPath);
    this.hi();
  }

  @Bind()
  hi() {
    console.log('hi');
  }
}
