import { PlayoffsEnum } from './playoffs-enum';
import { ScheduleEnum } from './schedule-enum';

export interface Tourney {
  _id: any;
  name: string;
  description?: string;
  rules?: string;
  dateCreated?: Date;
  registration?: {
    start: Date,
    end: Date,
  };
  duration?: {
    start: Date,
    end: Date,
  };
  participants?: {
    min: number,
    max: number,
  };
  playoffs?: PlayoffsEnum;
  schedule?: ScheduleEnum;
  owner?: any;
  players?: Array<string>;
};
