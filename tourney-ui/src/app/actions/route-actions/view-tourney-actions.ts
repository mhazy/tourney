import { Action } from '@ngrx/store';

export const ROUTE_VIEW_TOURNEY_ACTION = 'ROUTE-VIEW-TOURNEY-ACTION';
export const ROUTE_VIEW_MY_TOURNEYS_ACTION = 'ROUTE-VIEW-MY-TOURNEYS-ACTION';
export const ROUTE_VIEW_ALL_TOURNEYS_ACTION = 'ROUTE-VIEW-ALL-TOURNEYS-ACTION';
export const ROUTE_CREATE_NEW_TOURNEY_ACTION = 'ROUTE-CREATE-NEW-TOURNEY-ACTION';

export function route_to_view_all_tourneys(): Action {
  return { type: ROUTE_VIEW_ALL_TOURNEYS_ACTION };
}

export function route_to_create_new_tourney(): Action {
  return { type: ROUTE_CREATE_NEW_TOURNEY_ACTION };
}

export function route_to_view_my_tourneys(): Action {
  return { type: ROUTE_VIEW_MY_TOURNEYS_ACTION };
}

export function route_to_view_tourney(tourneyId: string): Action {
  return { type: ROUTE_VIEW_TOURNEY_ACTION, payload: tourneyId};
};
