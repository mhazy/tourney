import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
import { TourneyState } from '../../models/tourney-state-model';
import appActions from '../../actions/tourney-app-actions';
import { Tourney } from '../../models/tourney-model';

@Component({
  selector: 'view-all-tourneys-container',
  templateUrl: './view-all-tourneys-container.html',
})
export class ViewAllTourneysContainer implements OnInit {
  private name: String = 'All Tournaments';
  private tourneys: Array<Tourney> = [];
  private refresh;
  private goToViewTourney;
  private goToCreateTourney;

  ngOnInit(): void {
    if(this.tourneys.length === 0) {
      this.refresh();
    }
  }

  constructor(private store: Store<AppState>) {
    store.select('tourney').subscribe((state: TourneyState) => {
      this.tourneys = state.allTourneysList
    });

    this.refresh = function(store, appActions) {
      return function () {
         store.dispatch(appActions.tourneyActions.tourneyGetAllListAction());
      };
    }(this.store, appActions);

    this.goToViewTourney = function(store, appActions) {
      return function(tourneyId:string) {
        store.dispatch(appActions.routeActions.route_to_view_tourney(tourneyId));
      };
    }(this.store, appActions);

    this.goToCreateTourney = function(store, appActions) {
      return function() {
        store.dispatch(appActions.routeActions.route_to_create_new_tourney());
      };
    }(this.store, appActions);
  }
}
