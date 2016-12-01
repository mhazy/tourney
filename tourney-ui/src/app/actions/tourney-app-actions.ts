import { Injectable } from '@angular/core';
import { ActionNotificationActions, ActionNotificationActionTypes } from './action-notification-actions';
import { TourneyActions, TourneyActionTypes } from './tourney-actions';
import { UserActions, UserActionTypes } from './user-actions';

@Injectable()
export class TourneyAppActions {
  public readonly actionNotificationActions = new ActionNotificationActions();
  public readonly actionNotificationTypes = ActionNotificationActionTypes;
  public readonly tourneyActions = new TourneyActions();
  public readonly tourneyActionTypes = TourneyActionTypes;
  public readonly userActions = new UserActions();
  public readonly userActionTypes = UserActionTypes;
}
