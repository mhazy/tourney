import { Action } from '@ngrx/store';
import { ActionNotificationEnum } from '../models/action-notification-model';

export const ActionNotificationActionTypes = {
  NOTIFY_ACTION_SUCCEEDED: 'NOTIFY-ACTION-SUCCEEDED-ACTION',
  NOTIFY_ACTION_FAILED: 'NOTIFY-ACTION-FAILED-ACTION',
};

export class ActionNotificationActions {

  actionSucceeded(message: string): Action {
    return {
      type: ActionNotificationActionTypes.NOTIFY_ACTION_SUCCEEDED,
      payload: { type: ActionNotificationEnum.SUCCESS, 'message': message }
    };
  }

  actionFailed(message: string): Action {
    return {
      type: ActionNotificationActionTypes.NOTIFY_ACTION_FAILED,
      payload: { type: ActionNotificationEnum.FAIL, 'message': message }
    };
  }
}
