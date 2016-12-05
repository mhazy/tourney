import { Action } from '@ngrx/store';
import { User } from '../../models/user-model';

export const USER_LOG_IN_ACTION = 'USER-LOG-IN-ACTION';
export const USER_LOGGED_IN_ACTION = 'USER-LOGGED-IN-ACTION';

export function userLogInAction(user: User): Action {
  return { type: USER_LOG_IN_ACTION, payload: user };
};
export function userLoggedInAction(user: User): Action {
  return { type: USER_LOGGED_IN_ACTION, payload: user };
};
