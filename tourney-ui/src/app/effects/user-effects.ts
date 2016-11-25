import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActions } from '../actions/user-actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Auth } from '../service/auth.service';
import { TourneyService } from '../service/tourney-service';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userActions: UserActions,
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute,
    private tourneyService: TourneyService,
  ) { }

  @Effect() login$ = this.actions$
    .ofType(UserActions.USER_LOG_IN_ACTION)
    .switchMap( (action) => this.tourneyService.loginUser(action.payload))
    .map((user)=> this.userActions.userLoggedInAction(user));

  @Effect() logout$ = this.actions$
    .ofType(UserActions.USER_LOG_OUT_ACTION)
      // Navigate back to root
      .switchMap( () => this.router.navigate(['/']));
}