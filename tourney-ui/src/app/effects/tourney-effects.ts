import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { TourneyAppActions } from '../actions/tourney-app-actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { TourneyService } from '../service/tourney-service';
import { ResponseEnum } from '../models/response-enum';


@Injectable()
export class TourneyEffects {
  @Effect() createTourney$ = this.actions$
    .ofType(this.appActions.tourneyActionTypes.TOURNEY_CREATE_ACTION)
    .switchMap((action) => this.tourneyService.createTourney(action.payload))
    .map((response) => {
      switch(response.status) {
        case ResponseEnum.SUCCESS:
          return this.appActions.tourneyActions.tourneyCreatedAction(JSON.parse(response.message));
        case ResponseEnum.FAIL:
          return this.appActions.actionNotificationActions.actionFailed(response.message);
        default:
          return this.appActions.actionNotificationActions.actionFailed(response.message);
      }
    });

  @Effect() getAllTourneysList$ = this.actions$
    .ofType(this.appActions.tourneyActionTypes.TOURNEY_GET_ALL_LIST)
    .switchMap((action) => this.tourneyService.getAllTourneysList())
    .map((response) => {
      switch(response.status) {
        case ResponseEnum.SUCCESS:
          return this.appActions.tourneyActions.tourneyGotAllListAction(JSON.parse(response.message));
        case ResponseEnum.FAIL:
          return this.appActions.actionNotificationActions.actionFailed(response.message);
        default:
          return this.appActions.actionNotificationActions.actionFailed(response.message);
      }
    });

  @Effect() getMyTourneysList$ = this.actions$
    .ofType(this.appActions.tourneyActionTypes.TOURNEY_GET_MY_LIST)
    .switchMap((action) => this.tourneyService.getMyTourneysList())
    .map((response) => {
      switch(response.status) {
        case ResponseEnum.SUCCESS:
          return this.appActions.tourneyActions.tourneyGotMyListAction(JSON.parse(response.message));
        case ResponseEnum.FAIL:
          return this.appActions.actionNotificationActions.actionFailed(response.message);
        default:
          return this.appActions.actionNotificationActions.actionFailed(response.message);
      }
    });

  constructor(
    private actions$: Actions,
    private appActions: TourneyAppActions,
    private tourneyService: TourneyService,
  ) { }
}
