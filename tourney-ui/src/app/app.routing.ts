import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTourneyContainer } from './containers/create-tourney/create-tourney-container';
import { ViewTourneysContainer } from './containers/view-tourneys/view-tourneys-container';
import { ViewTourneyContainer } from './containers/view-tourney/view-tourney-container';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/viewtourneys',
    pathMatch: 'full',
  },
  {
    path: 'createtourney',
    component: CreateTourneyContainer,
  },
  {
    path: 'edittourney/:id',
    component: CreateTourneyContainer,
  },
  {
    path: 'viewtourneys',
    component: ViewTourneysContainer,
  },
  {
    path: 'tourney/:id',
    component: ViewTourneyContainer,
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
