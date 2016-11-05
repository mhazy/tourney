import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Tourney } from '../../service/classes/tourney';
import { TourneyService } from '../../service/tourney-service';

@Component({
    selector: 'view-tourneys-container',
    templateUrl: './src/app/containers/view-tourneys/view-tourneys-container.html',
})
export class ViewTourneysContainer implements OnInit {
    private tourneys = [];

    ngOnInit(): void {
        this.tourneyService.getTourneys()
        .then(tourneys => this.tourneys = tourneys)
        .catch(() => {console.log('error getting all tourneys'); return []});
    }

    constructor(
        private router: Router,
        private tourneyService: TourneyService){
    }
}