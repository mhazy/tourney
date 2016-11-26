import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from './service/auth-service';
import { AppState } from './reducers';
import { UserActions } from './actions/user-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user;
  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private auth: Auth) {
    store.select('user').subscribe(user => this.user = user);
  }

  private login() {
    this.auth.login();
  }

  private logout() {
    this.auth.logout();
  }
}
