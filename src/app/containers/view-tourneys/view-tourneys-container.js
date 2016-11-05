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
var tourney_service_1 = require('../../service/tourney-service');
var ViewTourneysContainer = (function () {
    function ViewTourneysContainer(router, tourneyService) {
        this.router = router;
        this.tourneyService = tourneyService;
        this.tourneys = [];
    }
    ViewTourneysContainer.prototype.ngOnInit = function () {
        var _this = this;
        this.tourneyService.getTourneys()
            .then(function (tourneys) { return _this.tourneys = tourneys; })
            .catch(function () { console.log('error getting all tourneys'); return []; });
    };
    ViewTourneysContainer = __decorate([
        core_1.Component({
            selector: 'view-tourneys-container',
            templateUrl: './src/app/containers/view-tourneys/view-tourneys-container.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, tourney_service_1.TourneyService])
    ], ViewTourneysContainer);
    return ViewTourneysContainer;
}());
exports.ViewTourneysContainer = ViewTourneysContainer;
//# sourceMappingURL=view-tourneys-container.js.map