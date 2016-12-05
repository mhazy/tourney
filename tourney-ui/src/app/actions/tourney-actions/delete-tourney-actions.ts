import { Action } from '@ngrx/store';
import { Tourney } from '../../models/tourney-model';

export const TOURNEY_DELETE_ACTION= 'TOURNEY-DELETE-ACTION';
export const TOURNEY_DELETED_ACTION= 'TOURNEY-DELETED-ACTION';

export function tourneyDeleteAction(tourneyId: String): Action {
  return { type: TOURNEY_DELETE_ACTION, payload: tourneyId };
};
export function tourneyDeletedAction(tourneyName: String): Action {
  return { type: TOURNEY_DELETED_ACTION, payload: tourneyName };
};
