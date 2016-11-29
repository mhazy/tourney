import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { User } from '../../models/user-model';

import { Tourney } from '../../models/tourney-model';
import { TourneyService } from '../../service/tourney-service';
import { ResponseEnum } from '../../models/response-enum';

@Component({
  selector: 'view-tourney-container',
  templateUrl: './view-tourney-container.html',
})
export class ViewTourneyContainer implements OnInit {
  private tourney: Tourney;
  private user: User;
  private dateFormat = "dd MMMM, yyyy";
  
  ngOnInit(): void {
    this.getTourney();
  }

  constructor(
    private tourneyService: TourneyService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store<AppState>,
  ) {
    store.select('user')
    .subscribe((user: User) => {
      this.user = user;
    });
  }

  private getTourney(): void {
    this.route.params.forEach(
      (params: Params) => {
        let id = params['id'];
        this.tourneyService
        .getTourney(id)
        .then((tourney) => {
            this.tourney = tourney;
            // @TODO sanatise the rules before they get marked?
            // this.tourney.rules = this.md.parse(this.tourney.rules);
          }
          )
          .catch(() => {
            console.log('error getting all tourney');
            return {};
          });
      }
    );
  }

  onJoin(): void {
    this.tourneyService
    .joinTourney(this.tourney._id, this.user._id)
    .then((response) => {
      switch(response.status) {
        case ResponseEnum.SUCCESS:
          this.tourney = JSON.parse(response.message);
          break;
        case ResponseEnum.FAIL:
        default:
          console.log('Failed to join tournament: ' + response.message);
          alert('Failed to join tournament: ' + response.message);
      }
    });
  }

  onLeave(): void {
    this.tourneyService
    .leaveTourney(this.tourney._id, this.user._id)
    .then((response) => {
      switch(response.status) {
        case ResponseEnum.SUCCESS:
          this.tourney = JSON.parse(response.message);
          break;
        case ResponseEnum.FAIL:
        default:
          console.log('Failed to leave tournament: ' + response.message);
          alert('Failed to leave tournament: ' + response.message);
      }
    });
  }

  onDelete(): void {
    this.tourneyService
    .deleteTourney(this.tourney._id)
    .then(() => {
      this.router.navigate(['/viewtourneys/']);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
