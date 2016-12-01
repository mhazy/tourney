import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { UserState, UserReducer } from './user-reducer';
import { TourneyReducer } from './tourney-reducer';
import { TourneyState } from '../models/tourney-state-model';

export interface AppState {
  user: UserState;
  tourney: TourneyState;
};

export default compose(combineReducers)({
  user: UserReducer,
  tourney: TourneyReducer,
});
