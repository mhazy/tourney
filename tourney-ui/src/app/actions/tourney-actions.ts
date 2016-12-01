import { Action } from '@ngrx/store';
import { Tourney } from '../models/tourney-model';

export const TourneyActionTypes = {
  TOURNEY_GET_MY_LIST: 'TOURNEY-GET-MY-LIST',
  TOURNEY_GOT_MY_LIST:  'TOURNEY-GOT-MY-LIST',
  TOURNEY_GET_ALL_LIST: 'TOURNEY-GET-ALL-LIST',
  TOURNEY_GOT_ALL_LIST:  'TOURNEY-GOT-ALL-LIST',
  TOURNEY_CREATE_ACTION: 'TOURNEY-CREATE-ACTION',
  TOURNEY_CREATED_ACTION: 'TOURNEY-CREATED-ACTION',
  TOURNEY_DELETE_ACTION: 'TOURNEY-DELETE-ACTION',
  TOURNEY_GET_ACTION: 'TOURNEY-GET-ACTION',
  TOURNEY_UPDATE_ACTION: 'TOURNEY-UPDATE-ACTION',
  TOURNEY_ADD_PLAYER_ACTION: 'TOURNEY-ADD-PLAYER-ACTION',
  TOURNEY_REMOVE_PLAYER_ACTION: 'TOURNEY-REMOVE-PLAYER-ACTION',
};

export class TourneyActions {

  tourneyGetMyListAction(): Action {
    return { type: TourneyActionTypes.TOURNEY_GET_MY_LIST };
  }

  tourneyGotMyListAction(tourneyList: Array<Tourney>): Action {
    return { type: TourneyActionTypes.TOURNEY_GOT_MY_LIST, payload: tourneyList };
  }

  tourneyGetAllListAction(): Action {
    return { type: TourneyActionTypes.TOURNEY_GET_ALL_LIST };
  }

  tourneyGotAllListAction(tourneyList: Array<Tourney>): Action {
    return { type: TourneyActionTypes.TOURNEY_GOT_ALL_LIST, payload: tourneyList };
  }

  tourneyCreateAction(tourney: Tourney): Action {
    return { type: TourneyActionTypes.TOURNEY_CREATE_ACTION, payload: tourney };
  }

  tourneyCreatedAction(tourney: Tourney): Action {
    return { type: TourneyActionTypes.TOURNEY_CREATED_ACTION, payload: tourney };
  }

  tourneyDeleteAction(tourneyId: string): Action {
    return { type: TourneyActionTypes.TOURNEY_DELETE_ACTION, payload: tourneyId };
  }

  tourneyGetAction(tourneyId: string): Action {
    return { type: TourneyActionTypes.TOURNEY_GET_ACTION, payload: tourneyId };
  }

  tourneyUpdateAction(tourney: Tourney): Action {
    return { type: TourneyActionTypes.TOURNEY_UPDATE_ACTION, payload: tourney};
  }

  tourneyAddPlayerAction(tourneyId: string, playerId: string): Action {
    return { type: TourneyActionTypes.TOURNEY_ADD_PLAYER_ACTION, payload: { 'tourneyId': tourneyId, 'playerId': playerId } };
  }

  tourneyRemovePlayerAction(tourneyId: string, playerId: string): Action {
    return { type: TourneyActionTypes.TOURNEY_REMOVE_PLAYER_ACTION, payload: { 'tourneyId': tourneyId, 'playerId': playerId } };
  }
}
