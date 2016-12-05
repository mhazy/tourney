import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Tourney } from '../../models/tourney-model';

@Component({
  selector: 'tourney-list',
  templateUrl: './tourney-list-component.html',
})
export class TourneyListComponent {
  @Input()
  name: String;
  @Input()
  tourneys: Array<Tourney>;
  @Input()
  refresh: Function;
  @Input()
  goToViewTourney: Function;
  @Input()
  goToCreateTourney: Function;
}
