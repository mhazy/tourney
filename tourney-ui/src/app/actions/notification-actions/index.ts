import { Action } from '@ngrx/store';
import { ActionNotificationEnum } from '../../models/action-notification-model';

export const NOTIFY_ACTION_SUCCEEDED = 'NOTIFY-ACTION-SUCCEEDED-ACTION';
export const NOTIFY_ACTION_FAILED = 'NOTIFY-ACTION-FAILED-ACTION';

export function actionSucceeded(message: string): Action {
  return { type: NOTIFY_ACTION_SUCCEEDED, payload: { type: ActionNotificationEnum.SUCCESS, 'message': message } };
};

export function actionFailed(message: string): Action {
  return { type: NOTIFY_ACTION_FAILED, payload: { type: ActionNotificationEnum.FAIL, 'message': message } };
};
