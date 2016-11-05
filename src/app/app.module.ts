import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import {routing } from './app.routing';

import { CreateTourneyContainer } from './containers/create-tourney/create-tourney-container';
import { ViewTourneysContainer } from './containers/view-tourneys/view-tourneys-container';
import { ViewTourneyContainer } from './containers/view-tourney/view-tourney-container';
import { TourneyService } from './service/tourney-service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
  ],
  declarations: [
      AppComponent,
      CreateTourneyContainer,
      ViewTourneysContainer,
      ViewTourneyContainer,
  ],
  providers: [
      TourneyService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
