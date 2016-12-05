import { Action } from '@ngrx/store';
import { User } from '../../models/user-model';

export const USER_GET_ACTION = 'USER-GET-ACTION';
export const USER_GOT_ACTION = 'USER-GOT-ACTION';

export function userGetAction(userId: number): Action {
  return { type: USER_GET_ACTION, payload: userId};
};

export function userGotAction(user: User): Action {
  return { type: USER_GOT_ACTION, payload: user };
}
