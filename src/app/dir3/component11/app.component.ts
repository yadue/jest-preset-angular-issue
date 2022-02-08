import { Component } from '@angular/core';

import { isEmpty } from 'lodash-es';
import { Bind } from 'lodash-decorators-esm';
import { format } from 'date-fns';
import { LOCALES } from '../../locales';
import { delay } from 'lodash-es';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jest-preset-issue';

  constructor() {
    console.log('qq', delay, format(new Date(), 'yyyy-MM-dd', { locale: LOCALES['en'] }), isEmpty({}));
    this.hi();
  }

  @Bind()
  hi() {
    console.log('hi');
  }
}
