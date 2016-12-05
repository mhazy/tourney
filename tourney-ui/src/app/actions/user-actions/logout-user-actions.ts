import { Action } from '@ngrx/store';

export const USER_LOG_OUT_ACTION = 'USER-LOG-OUT-ACTION';
export const USER_LOGGED_OUT_ACTION = 'USER-LOGGED-OUT-ACTION';

export function userLogOutAction(): Action {
  return { type: USER_LOG_OUT_ACTION};
};
export function userLoggedOutAction(): Action {
  return { type: USER_LOGGED_OUT_ACTION};
};
