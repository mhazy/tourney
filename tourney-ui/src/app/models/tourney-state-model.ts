import { Tourney } from './tourney-model';

export type TourneyState = {
  allTourneysList: Array<Tourney>;
  myTourneysList: Array<Tourney>;
  tourneys: Array<Tourney>;
  tourney: Tourney;
};
