import { PlayoffsEnum } from './playoffs-enum';
import { ScheduleEnum } from './schedule-enum';

export interface Tourney {
  id: number;
  name: string;
  description: string;
  rules: string;
  registration: {
    start: Date,
    end: Date,
  };
  duration: {
    start: Date,
    end: Date,
  };
  participants: {
    min: number,
    max: number,
  };
  playoffs: PlayoffsEnum;
  schedule: ScheduleEnum;
};
