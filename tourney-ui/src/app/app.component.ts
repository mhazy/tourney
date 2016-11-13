import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Auth } from './service/auth.service';
import { AppState } from './reducers';
import { User } from './models/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userOb;
  public user;
  constructor(private store: Store<AppState>, private auth: Auth) {
    store.select('user').forEach(
      user => {
        console.log('!!!user = ');
        console.log(user);
        this.user = user;
      }
    );
  }
}
