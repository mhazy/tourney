import { ActionReducer, Action } from '@ngrx/store';

import { User } from '../models/user-model';
import { UserActionTypes } from '../actions/user-actions';

export type UserState = User;

const initState: UserState = {
  _id: -1,
  name: '',
  email: '',
  avatar: '',
  profileId: '',
  authToken: ''
};

export const UserReducer: ActionReducer<UserState> = (state: UserState = initState, action: Action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOGGED_IN_ACTION:
      return action.payload;
    case UserActionTypes.USER_LOGGED_OUT_ACTION:
      return initState;
    default:
      return state;
    }
};
