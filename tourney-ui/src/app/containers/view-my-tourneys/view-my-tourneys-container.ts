import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
import { TourneyState } from '../../models/tourney-state-model';
import { TourneyAppActions } from '../../actions/tourney-app-actions';
import { Tourney } from '../../models/tourney-model';

@Component({
  selector: 'view-my-tourneys-container',
  templateUrl: './view-my-tourneys-container.html',
})
export class ViewMyTourneysContainer implements OnInit {
  private name: String = 'My Tournaments';
  private tourneys: Array<Tourney> = [];
  private refresh = function(store, appActions) {
    return function () {
       store.dispatch(appActions.tourneyActions.tourneyGetMyListAction());
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
      this.tourneys = state.myTourneysList
    });
  }
}
