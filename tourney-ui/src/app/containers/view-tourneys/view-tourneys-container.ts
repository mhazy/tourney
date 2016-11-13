import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { TourneyService } from '../../service/tourney-service';

@Component({
  selector: 'view-tourneys-container',
  templateUrl: './view-tourneys-container.html',
})
export class ViewTourneysContainer implements OnInit {
  private tourneys = [];

  ngOnInit(): void {
    this.tourneyService.getTourneys()
      .then(tourneys => this.tourneys = tourneys)
      .catch(() => {
        console.log('error getting all tourneys');
        return [];
      });
  }

  constructor(
    private router: Router,
    private tourneyService: TourneyService) {
  }
}
