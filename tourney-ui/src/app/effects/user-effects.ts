import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { TourneyAppActions } from '../actions/tourney-app-actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Auth } from '../service/auth-service';
import { TourneyService } from '../service/tourney-service';


@Injectable()
export class UserEffects {
  @Effect() login$ = this.actions$
    .ofType(this.appActions.userActionTypes.USER_LOG_IN_ACTION)
    .switchMap((action) => this.tourneyService.loginUser(action.payload))
    .map((user) => this.appActions.userActions.userLoggedInAction(user));

  @Effect() logout$ = this.actions$
    .ofType(this.appActions.userActionTypes.USER_LOG_OUT_ACTION)
    .switchMap( () => this.router.navigate(['/']));

  constructor(
    private actions$: Actions,
    private appActions: TourneyAppActions,
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute,
    private tourneyService: TourneyService,
  ) { }
}
