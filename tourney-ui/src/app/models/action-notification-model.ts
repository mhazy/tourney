export enum ActionNotificationEnum {
  SUCCESS,
  FAIL,
  WARNING,
  INFO,
};

export interface ActionNotification {
  type: ActionNotificationEnum;
  message: string;
};
