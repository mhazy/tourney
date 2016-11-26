import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserEffects } from './effects/user-effects';

import { UserActions } from './actions/user-actions';
import reducer from './reducers';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth } from './service/auth-service';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { WelcomePageContainer } from './containers/welcome-page/welcome-page-container';
import { CreateTourneyContainer } from './containers/create-tourney/create-tourney-container';
import { ViewTourneysContainer } from './containers/view-tourneys/view-tourneys-container';
import { ViewTourneyContainer } from './containers/view-tourney/view-tourney-container';
import { TourneyService } from './service/tourney-service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    StoreModule.provideStore(reducer),
    EffectsModule.run(UserEffects),
  ],
  declarations: [
    AppComponent,
    WelcomePageContainer,
    CreateTourneyContainer,
    ViewTourneysContainer,
    ViewTourneyContainer,
  ],
  providers: [
    UserActions,
    TourneyService,
    Auth,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
