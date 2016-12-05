import { ActionReducer, Action } from '@ngrx/store';

import { Tourney } from '../models/tourney-model';
import appActions from '../actions/tourney-app-actions';
import { TourneyState } from '../models/tourney-state-model';

const initState: TourneyState = {
  allTourneysList: [],
  myTourneysList: [],
  tourneys: [],
  tourney: {
    _id: '',
    name: '',
  },
}

export const TourneyReducer: ActionReducer<TourneyState> = (state: TourneyState = initState, action: Action) => {
  const newState = <TourneyState>JSON.parse(JSON.stringify(state));
  console.log('state = ' + JSON.stringify(newState));
  switch (action.type) {
    case appActions.tourneyActions.TOURNEY_GOT_ALL_LIST:
      newState.allTourneysList = action.payload;
      return newState;
    case appActions.tourneyActions.TOURNEY_GOT_MY_LIST:
      newState.myTourneysList = action.payload;
      return newState;
    case appActions.tourneyActions.TOURNEY_CREATED_ACTION:
      newState.tourney = action.payload;
      return newState;
    default:
      return state;
    }
};
