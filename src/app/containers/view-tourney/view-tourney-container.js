"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var tourney_service_1 = require('../../service/tourney-service');
var ViewTourneyContainer = (function () {
    function ViewTourneyContainer(tourneyService, route, location) {
        this.tourneyService = tourneyService;
        this.route = route;
        this.location = location;
    }
    ViewTourneyContainer.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id']; //+ converts the value to a number
            _this.tourneyService.getTourney(id)
                .then(function (tourney) { console.log('go tourney = ' + JSON.stringify(tourney)); _this.tourney = tourney; })
                .catch(function () { console.log('error getting all tourney'); return {}; });
        });
    };
    ViewTourneyContainer.prototype.onDelete = function () {
        this.tourneyService.deleteTourney(this.tourney);
    };
    ViewTourneyContainer.prototype.goBack = function () {
        this.location.back();
    };
    ViewTourneyContainer = __decorate([
        core_1.Component({
            selector: 'view-tourney-container',
            templateUrl: './src/app/containers/view-tourney/view-tourney-container.html',
        }), 
        __metadata('design:paramtypes', [tourney_service_1.TourneyService, router_1.ActivatedRoute, common_1.Location])
    ], ViewTourneyContainer);
    return ViewTourneyContainer;
}());
exports.ViewTourneyContainer = ViewTourneyContainer;
//# sourceMappingURL=view-tourney-container.js.map