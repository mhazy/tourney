import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { UserState, UserReducer } from './user-reducer';

export interface AppState {
  user: UserState;
};

export default compose(combineReducers)({
  user: UserReducer
});
