import { Action } from '@ngrx/store';
import { Tourney } from '../../models/tourney-model';

export const TOURNEY_CREATE_ACTION = 'TOURNEY-CREATE-ACTION';
export const TOURNEY_CREATED_ACTION = 'TOURNEY-CREATED-ACTION';

export function tourneyCreateAction(tourney: Tourney): Action {
  return { type: TOURNEY_CREATE_ACTION, payload: tourney };
};
export function tourneyCreatedAction(tourney: Tourney): Action {
  return { type: TOURNEY_CREATED_ACTION, payload: tourney };
};
