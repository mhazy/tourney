import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig } from './auth.config';
import { UserActions } from '../actions/user-actions';
import { AppState } from '../reducers';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});

  constructor(private store: Store<AppState>, private userActions: UserActions) {
    window.addEventListener('storage', this.checkIfLocalStoreIsUpdated);
  }

  private checkIfLocalStoreIsUpdated() {
    if(localStorage.getItem('id_token')){
      console.log('i am authenticated!!!')
      const authToken = localStorage.getItem('id_token');
      const profile = JSON.parse(localStorage.getItem('profile'));
      const user = {
        id: profile.user_id,
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
        authToken: authToken
      };
      this.store.dispatch(this.userActions.userLoggedInAction(user));
    }else{
      console.log('i am not authenticated!??');
      this.setupAuthHook();
    }
  }

  private setupAuthHook() {
    this.lock.on('authenticated', (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
        this.lock.getProfile(
          authResult.idToken,
          function (error, profile) {
            if (error){
              localStorage.setItem('error', 'Error happened while logging in ' + error);
              return;
            }
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('profile', JSON.stringify(profile));
          }
        );
      })
  }
  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.store.dispatch(this.userActions.userLoggedOutAction());
    window.location.href='http://' + myConfig.domain + '/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A4020';
  };
}
