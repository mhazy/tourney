import { ActionReducer, Action } from '@ngrx/store';

import { User } from '../models/user-model';
import appActions from '../actions/tourney-app-actions';

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
    case appActions.userActions.USER_LOGGED_IN_ACTION:
      return action.payload;
    case appActions.userActions.USER_LOGGED_OUT_ACTION:
      return initState;
    default:
      return state;
    }
};
