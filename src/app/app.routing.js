"use strict";
var router_1 = require('@angular/router');
var create_tourney_container_1 = require('./containers/create-tourney/create-tourney-container');
var view_tourneys_container_1 = require('./containers/view-tourneys/view-tourneys-container');
var view_tourney_container_1 = require('./containers/view-tourney/view-tourney-container');
var appRoutes = [
    {
        path: '',
        redirectTo: '/viewtourneys',
        pathMatch: 'full',
    },
    {
        path: 'createtourney',
        component: create_tourney_container_1.CreateTourneyContainer,
    },
    {
        path: 'edittourney/:id',
        component: create_tourney_container_1.CreateTourneyContainer,
    },
    {
        path: 'viewtourneys',
        component: view_tourneys_container_1.ViewTourneysContainer,
    },
    {
        path: 'tourney/:id',
        component: view_tourney_container_1.ViewTourneyContainer,
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map