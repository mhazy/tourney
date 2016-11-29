import { ResponseEnum } from './response-enum';

export interface ResponseMessage {
  status: ResponseEnum;
  message: string;
};
