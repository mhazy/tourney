import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Tourney } from '../../models/tourney-model';
import { TourneyService } from '../../service/tourney-service';

@Component({
  selector: 'view-tourney-container',
  templateUrl: './view-tourney-container.html',
})
export class ViewTourneyContainer implements OnInit {
  tourney: Tourney;
  user = {
    id: 0,
    name: 'John Doe',
    email: 'john.doe@foo.bar'
  }; // MOCK USER @TODO add user service

  ngOnInit(): void {
    this.getTourney();
  }

  constructor(
    private tourneyService: TourneyService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  private getTourney(): void {
    this.route.params.forEach(
      (params: Params) => {
        let id = +params['id']; // + converts the value to a number
        this.tourneyService.getTourney(id)
          .then(
          tourney => {
            console.log('go tourney = ' + JSON.stringify(tourney));
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
    this.tourneyService.joinTourney(this.tourney.id, this.user.id).then(reponse => { alert(reponse.message); this.getTourney(); });
  }

  onLeave(): void {
    this.tourneyService.leaveTourney(this.tourney.id, this.user.id).then(reponse => { alert(reponse.message); this.getTourney(); });
  }

  onDelete(): void {
    this.tourneyService.deleteTourney(this.tourney).then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
