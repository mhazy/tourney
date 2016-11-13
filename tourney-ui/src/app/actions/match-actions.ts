import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Match } from '../service/classes/match';


@Injectable()
export class MatchActions {
  static MATCH_CREATE_ACTION = 'MATCH-CREATE-ACTION';
  static MATCH_DELETE_ACTION = 'MATCH-DELETE-ACTION';
  static MATCH_GET_ACTION = 'MATCH-GET-ACTION';
  static MATCH_UPDATE_ACTION = 'MATCH-UPDATE-ACTION';
  static MATCH_SUBMIT_SCORE_ACTION = 'MATCH-SUBMIT-SCORE-ACTION';

   matchCreateAction( match: Match): Action {
    return {
      type: MATCH_CREATE_ACTION,
      payload: match
    };
  }

   matchDeleteAction(matchId: Number): Action {
    return {
      type: MATCH_DELETE_ACTION,
      payload: matchId
    };
  }

   matchGetAction(matchId: Number): Action {
    return {
      type: MATCH_GET_ACTION,
      payload: matchId
    };
  }

   matchUpdateAction( match: Match): Action {
    return {
      type: MATCH_UPDATE_ACTION,
      payload: match
    };
  }

   matchSubmitScoreAction( matchId: Number, score: Object): Action {
    return {
      type: MATCH_UPDATE_ACTION,
      payload: { 'matchId': matchId, 'score': score }
    };
  }
}
