import { Action } from '@ngrx/store';
import { User } from '../models/user-model';

export const UserActionTypes = {
  USER_LOGGED_IN_ACTION: 'USER-LOGGED-IN-ACTION',
  USER_LOGGED_OUT_ACTION: 'USER-LOGGED-OUT-ACTION',
  USER_GET_ACTION: 'USER-GET-ACTION',
  USER_LOG_IN_ACTION:'USER-LOG-IN-ACTION',
  USER_LOG_OUT_ACTION: 'USER-LOG-OUT-ACTION',
};

export class UserActions {

  userLoggedInAction(user: User): Action {
    return {
      type: UserActionTypes.USER_LOGGED_IN_ACTION,
      payload: user
    };
  }

  userLoggedOutAction(): Action {
    return {
      type: UserActionTypes.USER_LOGGED_OUT_ACTION
    };
  }

  userGetAction(userId: number): Action {
    return {
      type: UserActionTypes.USER_GET_ACTION,
      payload: userId
    };
  }

  userLogInAction(user: User): Action {
    return {
      type: UserActionTypes.USER_LOG_IN_ACTION,
      payload: user
    };
  }

  userLogOutAction(): Action {
    return {
      type: UserActionTypes.USER_LOG_OUT_ACTION
    };
  }
}
