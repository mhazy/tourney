import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
import { TourneyState } from '../../models/tourney-state-model';
import { TourneyAppActions } from '../../actions/tourney-app-actions';
import { Tourney } from '../../models/tourney-model';

@Component({
  selector: 'view-all-tourneys-container',
  templateUrl: './view-all-tourneys-container.html',
})
export class ViewAllTourneysContainer implements OnInit {
  private name: String = 'All Tournaments';
  private tourneys: Array<Tourney> = [];
  private refresh = function(store, appActions) {
    return function () {
       store.dispatch(appActions.tourneyActions.tourneyGetAllListAction());
    };
  }(this.store, this.appActions);

  ngOnInit(): void {
    if(this.tourneys.length === 0) {
      this.refresh();
    }
  }

  constructor(
    private store: Store<AppState>,
    private appActions: TourneyAppActions,) {
    store.select('tourney')
    .subscribe((state: TourneyState) => {
      this.tourneys = state.allTourneysList
    });
  }
}
