import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import appActions from '../actions/tourney-app-actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { TourneyService } from '../service/tourney-service';
import { ResponseEnum } from '../models/response-enum';


@Injectable()
export class TourneyEffects {

  @Effect() createdTourney$ = this.actions$
    .ofType(appActions.tourneyActions.TOURNEY_CREATED_ACTION)
    .map((response) => {
      return appActions.routeActions.route_to_view_tourney(response.payload._id);
    });

  @Effect() createTourney$ = this.actions$
    .ofType(appActions.tourneyActions.TOURNEY_CREATE_ACTION)
    .switchMap((action) => this.tourneyService.createTourney(action.payload))
    .map((response) => {
      switch(response.status) {
        case ResponseEnum.SUCCESS:
          return appActions.tourneyActions.tourneyCreatedAction(JSON.parse(response.message));
        case ResponseEnum.FAIL:
          return appActions.notificationActions.actionFailed(response.message);
        default:
          return appActions.notificationActions.actionFailed(response.message);
      }
    });

  @Effect() getAllTourneysList$ = this.actions$
    .ofType(appActions.tourneyActions.TOURNEY_GET_ALL_LIST)
    .switchMap((action) => this.tourneyService.getAllTourneysList())
    .map((response) => {
      switch(response.status) {
        case ResponseEnum.SUCCESS:
          return appActions.tourneyActions.tourneyGotAllListAction(JSON.parse(response.message));
        case ResponseEnum.FAIL:
          return appActions.notificationActions.actionFailed(response.message);
        default:
          return appActions.notificationActions.actionFailed(response.message);
      }
    });

  @Effect() getMyTourneysList$ = this.actions$
    .ofType(appActions.tourneyActions.TOURNEY_GET_MY_LIST)
    .switchMap((action) => this.tourneyService.getMyTourneysList())
    .map((response) => {
      switch(response.status) {
        case ResponseEnum.SUCCESS:
          return appActions.tourneyActions.tourneyGotMyListAction(JSON.parse(response.message));
        case ResponseEnum.FAIL:
          return appActions.notificationActions.actionFailed(response.message);
        default:
          return appActions.notificationActions.actionFailed(response.message);
      }
    });

  constructor(
    private actions$: Actions,
    private tourneyService: TourneyService,
  ) { }
}
