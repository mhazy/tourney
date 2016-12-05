import { Action } from '@ngrx/store';
import { Tourney } from '../../models/tourney-model';

export const TOURNEY_GET_MY_LIST = 'TOURNEY-GET-MY-LIST';
export const TOURNEY_GOT_MY_LIST = 'TOURNEY-GOT-MY-LIST';

export function tourneyGetMyListAction(): Action {
    return { type: TOURNEY_GET_MY_LIST };
};
export function tourneyGotMyListAction(tourneyList: Array<Tourney>): Action {
  return { type: TOURNEY_GOT_MY_LIST, payload: tourneyList };
};
