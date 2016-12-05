import { ActionReducer, Action } from '@ngrx/store';

import { Route } from '../models/route-model';
import appActions from '../actions/tourney-app-actions';

export type RouteState = Route;

const initState: RouteState = {
  route: '/',
  params: '',
};

export const RouteReducer: ActionReducer<RouteState> = (state: RouteState = initState, action: Action) => {
  switch (action.type) {
    case appActions.routeActions.ROUTE_VIEW_TOURNEY_ACTION:
      return { route: '/viewtourney/', params: action.payload };
    case appActions.routeActions.ROUTE_VIEW_MY_TOURNEYS_ACTION:
      return { route: '/viewmytourneys'};
    case appActions.routeActions.ROUTE_VIEW_ALL_TOURNEYS_ACTION:
      return { route: '/viewalltourneys' };
    case appActions.routeActions.ROUTE_CREATE_NEW_TOURNEY_ACTION:
      return { route: '/createtourney' };
    default:
      return state;
    }
};
