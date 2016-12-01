import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Match } from '../models/match-model';


@Injectable()
export class MatchActions {
  static MATCH_CREATE_ACTION = 'MATCH-CREATE-ACTION';
  static MATCH_DELETE_ACTION = 'MATCH-DELETE-ACTION';
  static MATCH_GET_ACTION = 'MATCH-GET-ACTION';
  static MATCH_UPDATE_ACTION = 'MATCH-UPDATE-ACTION';
  static MATCH_SUBMIT_SCORE_ACTION = 'MATCH-SUBMIT-SCORE-ACTION';

   matchCreateAction(match: Match): Action {
    return {
      type: MatchActions.MATCH_CREATE_ACTION,
      payload: match
    };
  }

   matchDeleteAction(matchId: string): Action {
    return {
      type: MatchActions.MATCH_DELETE_ACTION,
      payload: matchId
    };
  }

   matchGetAction(matchId: string): Action {
    return {
      type: MatchActions.MATCH_GET_ACTION,
      payload: matchId
    };
  }

   matchUpdateAction(match: Match): Action {
    return {
      type: MatchActions.MATCH_UPDATE_ACTION,
      payload: match
    };
  }

   matchSubmitScoreAction(matchId: string, score: Object): Action {
    return {
      type: MatchActions.MATCH_UPDATE_ACTION,
      payload: { 'matchId': matchId, 'score': score }
    };
  }
}
