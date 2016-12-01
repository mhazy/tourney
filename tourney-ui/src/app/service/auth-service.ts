import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig } from './auth-config';
import { TourneyAppActions } from '../actions/tourney-app-actions';
import { AppState } from '../reducers';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  ID_TOKEN_STORAGE_ITEM = 'id_token';
  PROFILE_STORAGE_ITEM = 'profile';

  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});

  constructor(
    private store: Store<AppState>,
    private appActions: TourneyAppActions
  ) {
    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // @TODO Handle error
          return;
        }
        localStorage.setItem(this.ID_TOKEN_STORAGE_ITEM, authResult.idToken);
        localStorage.setItem(this.PROFILE_STORAGE_ITEM, JSON.stringify(profile));
        this.checkIfLocalStoreIsUpdated();
      });
    });
    this.checkIfLocalStoreIsUpdated();
  }

  private checkIfLocalStoreIsUpdated() {
    if (this.authenticated()) {
      const authToken = localStorage.getItem(this.ID_TOKEN_STORAGE_ITEM);
      const profile = JSON.parse(localStorage.getItem(this.PROFILE_STORAGE_ITEM));
      const user = {
        _id: -1,
        name: profile.name,
        email: profile.email,
        avatar: profile.picture,
        profileId: profile.user_id,
        authToken: authToken
      };
      this.store.dispatch(this.appActions.userActions.userLogInAction(user));
    }
  }

  public login() {
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem(this.ID_TOKEN_STORAGE_ITEM);
    localStorage.removeItem(this.PROFILE_STORAGE_ITEM);
    this.store.dispatch(this.appActions.userActions.userLoggedOutAction());
    this.store.dispatch(this.appActions.userActions.userLogOutAction());
    // @TODO log out user by redirecting them to logout page in auth0
    // window.location.href='http://' + myConfig.domain + '/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A4020';
  };
}
