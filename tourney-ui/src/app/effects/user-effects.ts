import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { UserActions } from '../actions/user-actions';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Auth } from '../service/auth.service';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userActions: UserActions,
    private auth: Auth,
  ) { }

  //@Effect() login$ = this.actions$
  //    .ofType(UserActions.USER_LOG_IN_ACTION)
  //    .switchMap( () => this.auth.login())
  //    .map(item => this.userActions.userLoggedInAction(item));
      //.switchMap(payload => console.log('woot woot woot'))
        // If successful, dispatch success action with result
      //  .map(res => (userActions.userLoggedInAction('yayayaya')))
        // If request fails, dispatch failed action
      //  .catch(() => Observable.of({ type: 'LOGIN_FAILED' }));
      //);
}