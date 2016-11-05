import { Component } from '@angular/core';

@Component({
    selector: 'my-app2',
    template: `
       <div>
        <img src="./resources/logo.png" style="display:inline; vertical-align: middle;">
        <h1 style="display:inline; vertical-align: middle;">{{title}}</h1>
      </div>
      <div>
        <a routerLink="/viewtourneys">View Tourneys</a>
        <a routerLink="/createtourney">Create New Tourney</a>
      </div>
      <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    title = 'Tourney';
}