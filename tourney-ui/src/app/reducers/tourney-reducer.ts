import { ActionReducer, Action } from '@ngrx/store';

import { Tourney } from '../models/tourney-model';
import { TourneyActionTypes } from '../actions/tourney-actions';
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
  console.log('in tourney reducer');
  console.log('action = ' + JSON.stringify(action));
  console.log('state = ' + JSON.stringify(state));
  
  const newState = <TourneyState>JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TourneyActionTypes.TOURNEY_GOT_ALL_LIST:
      newState.allTourneysList = action.payload;
      return newState;
    case TourneyActionTypes.TOURNEY_GOT_MY_LIST:
      newState.myTourneysList = action.payload;
      return newState;
    case TourneyActionTypes.TOURNEY_CREATED_ACTION:
      newState.tourney = action.payload;
      return newState;
    default:
      return state;
    }
};
