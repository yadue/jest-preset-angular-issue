import { Component } from '@angular/core';

// import { isEmpty as _isEmpty } from 'lodash-es';
// import { Bind } from 'lodash-decorators-esm';
// import { format } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jest-preset-issue';

  constructor() {
    // console.log('qq', _isEmpty({}), format(new Date(), 'yyyy-MM-dd'));
    this.hi();
  }

  // @Bind()
  hi() {
      console.log('hi');
  }
}
