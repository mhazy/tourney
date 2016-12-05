import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { UserState, UserReducer } from './user-reducer';
import { TourneyReducer } from './tourney-reducer';
import { TourneyState } from '../models/tourney-state-model';
import { RouteState, RouteReducer } from './route-reducer';

export interface AppState {
  route: RouteState;
  tourney: TourneyState;
  user: UserState;
};

export default compose(combineReducers)({
  route: RouteReducer,
  tourney: TourneyReducer,
  user: UserReducer,
});
