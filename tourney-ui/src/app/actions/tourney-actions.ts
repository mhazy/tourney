import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Tourney } from '../service/classes/tourney';

@Injectable()
export class TourneyActions {
  static TOURNEY_CREATE_ACTION = 'TOURNEY-CREATE-ACTION';
  static TOURNEY_DELETE_ACTION = 'TOURNEY-DELETE-ACTION';
  static TOURNEY_GET_ACTION = 'TOURNEY-GET-ACTION';
  static TOURNEY_UPDATE_ACTION = 'TOURNEY-UPDATE-ACTION';
  static TOURNEY_ADD_PLAYER_ACTION = 'TOURNEY-ADD-PLAYER-ACTION';
  static TOURNEY_REMOVE_PLAYER_ACTION = 'TOURNEY-REMOVE-PLAYER-ACTION';

  tourneyCreateAction(tourney: Tourney): Action {
    return { type: TOURNEY_CREATE_ACTION, payload: tourney};
  }

  tourneyDeleteAction(tourneyId: Number): Action {
    return { type: TOURNEY_DELETE_ACTION, payload: tourneyId };
  }

  tourneyGetAction(tourneyId: Number): Action {
    return { type: TOURNEY_GET_ACTION, payload: tourneyId };
  }

  tourneyUpdateAction(tourney: Tourney): Action {
    return { type: TOURNEY_UPDATE_ACTION, payload: tourney};
  }

  tourneyAddPlayerAction(tourneyId: Number, playerId: Number): Action {
    return { type: TOURNEY_ADD_PLAYER_ACTION, payload: { 'tourneyId': tourneyId, 'playerId': playerId } };
  }

  tourneyRemovePlayerAction(tourneyId: Number, playerId: Number): Action {
    return { type: TOURNEY_REMOVE_PLAYER_ACTION, payload: { 'tourneyId': tourneyId, 'playerId': playerId } };
  }
}
