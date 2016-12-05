import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Auth } from './service/auth-service';
import { AppState } from './reducers';
import appActions from './actions/tourney-app-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user;
  private route;
  private tourneyAppActions = appActions;
  private routes = {
    view_all_tourneys: 0,
    view_my_tourneys: 1,
    create_new_tourney: 2,
  }
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private auth: Auth) {
    store.select('user').subscribe(user => this.user = user);
    store.select('route').subscribe(route => this.navigateToRoute(route));
  }

  private goToRoute(route: number) {
    switch(route) {
      case this.routes.view_my_tourneys:
        this.store.dispatch(appActions.routeActions.route_to_view_my_tourneys());
        break;
      case this.routes.view_all_tourneys:
        this.store.dispatch(appActions.routeActions.route_to_view_all_tourneys());
        break;
      case this.routes.create_new_tourney:
        this.store.dispatch(appActions.routeActions.route_to_create_new_tourney());
        break;
    }
  }

  private navigateToRoute(route) {
    this.route = route;
    if(this.route.params) {
      this.router.navigate([this.route.route, this.route.params]);
    }else {
      this.router.navigate([this.route.route]);
    }
  }

  private login() {
    this.auth.login();
  }

  private logout() {
    this.auth.logout();
  }
}
