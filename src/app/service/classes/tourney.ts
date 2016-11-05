import { PlayoffsEnum } from './playoffsenum';
import { ScheduleEnum } from './scheduleenum';

export class Tourney{
    constructor(){
        this.id = -1;
        this.name = '';
        this.description = '';
        this.rules = '';
        this.registration = { start: undefined, end: undefined};
        this.duration = { start: undefined, end: undefined};
        this.participants = {min: 0, max: 0};
        this.playoffs = undefined;
        this.schedule = undefined;
    }
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
    
}