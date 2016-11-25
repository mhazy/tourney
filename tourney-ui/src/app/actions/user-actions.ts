import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from '../models/user-model';

@Injectable()
export class UserActions {
  static USER_LOGGED_IN_ACTION = 'USER-LOGGED-IN-ACTION';
  static USER_LOGGED_OUT_ACTION = 'USER-LOGGED-OUT-ACTION';
  static USER_GET_ACTION = 'USER-GET-ACTION';
  static USER_LOG_IN_ACTION = 'USER-LOG-IN-ACTION';
  static USER_LOG_OUT_ACTION = 'USER-LOG-OUT-ACTION';

  userLoggedInAction(user: User): Action {
    return {
      type: UserActions.USER_LOGGED_IN_ACTION,
      payload: user
    };
  }

  userLoggedOutAction(): Action {
    return {
      type: UserActions.USER_LOGGED_OUT_ACTION
    };
  }

  userGetAction(userId: number): Action {
    return {
      type: UserActions.USER_GET_ACTION,
      payload: userId
    };
  }

  userLogInAction(user: User): Action {
    return {
      type: UserActions.USER_LOG_IN_ACTION,
      payload: user
    };
  }

  userLogOutAction(): Action {
    return {
      type: UserActions.USER_LOG_OUT_ACTION
    };
  }
}
