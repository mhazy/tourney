import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserEffects } from './effects/user-effects';
import { TourneyEffects } from './effects/tourney-effects';

import { TourneyAppActions } from './actions/tourney-app-actions';
import reducer from './reducers';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth } from './service/auth-service';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { WelcomePageContainer } from './containers/welcome-page/welcome-page-container';
import { CreateTourneyContainer } from './containers/create-tourney/create-tourney-container';
import { ViewTourneysContainer } from './containers/view-tourneys/view-tourneys-container';
import { ViewTourneyContainer } from './containers/view-tourney/view-tourney-container';
import { ViewAllTourneysContainer } from './containers/view-all-tourneys/view-all-tourneys-container';
import { ViewMyTourneysContainer } from './containers/view-my-tourneys/view-my-tourneys-container';

import { TourneyService } from './service/tourney-service';
import { TourneyListComponent } from './components/tourney-list/tourney-list-component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    StoreModule.provideStore(reducer),
    EffectsModule.run(UserEffects),
    EffectsModule.run(TourneyEffects),
  ],
  declarations: [
    AppComponent,
    WelcomePageContainer,
    CreateTourneyContainer,
    ViewTourneysContainer,
    ViewTourneyContainer,
    ViewAllTourneysContainer,
    ViewMyTourneysContainer,
    TourneyListComponent,
  ],
  providers: [
    TourneyAppActions,
    TourneyService,
    Auth,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
