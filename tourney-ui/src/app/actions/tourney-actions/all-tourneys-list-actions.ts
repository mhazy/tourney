import { Action } from '@ngrx/store';
import { Tourney } from '../../models/tourney-model';

export const TOURNEY_GET_ALL_LIST = 'TOURNEY-GET-ALL-LIST';
export const TOURNEY_GOT_ALL_LIST = 'TOURNEY-GOT-ALL-LIST';

export function tourneyGetAllListAction(): Action {
  return { type: TOURNEY_GET_ALL_LIST };
};
export function tourneyGotAllListAction(tourneyList: Array<Tourney>): Action {
  return { type: TOURNEY_GOT_ALL_LIST, payload: tourneyList };
};
