import { Component } from '@angular/core';

import { isEmpty } from 'lodash-es';
import { Bind } from 'lodash-decorators-esm';
import { format } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jest-preset-issue';

  constructor() {
    console.log('qq', format(new Date(), 'yyyy-MM-dd', isEmpty({})));
    this.hi();
  }

  @Bind()
  hi() {
      console.log('hi');
  }
}
