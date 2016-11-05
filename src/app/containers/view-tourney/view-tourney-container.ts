import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Tourney } from '../../service/classes/tourney';
import { TourneyService } from '../../service/tourney-service';

@Component({
    selector: 'view-tourney-container',
    templateUrl: './src/app/containers/view-tourney/view-tourney-container.html',
})
export class ViewTourneyContainer implements OnInit {
    tourney: Tourney;

    ngOnInit(): void {
         this.route.params.forEach((params: Params) => {
            let id = +params['id']; //+ converts the value to a number
            this.tourneyService.getTourney(id)
            .then(tourney => {console.log('go tourney = ' + JSON.stringify(tourney)); this.tourney = tourney})
            .catch(() => {console.log('error getting all tourney'); return {}});
        })
    }

    constructor(
        private tourneyService: TourneyService,
        private route: ActivatedRoute,
        private location: Location
    ) {
    }

    onDelete(): void {
        this.tourneyService.deleteTourney(this.tourney);
    }

    goBack(): void {
        this.location.back();
    }
}