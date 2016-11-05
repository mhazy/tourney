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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var TourneyService = (function () {
    function TourneyService(http, router, route) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.tourneyAPIUrl = "http://localhost:8000/api/tourneys/";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    TourneyService.prototype.createTourney = function (tourney) {
        var _this = this;
        var url = "" + this.tourneyAPIUrl;
        console.log('posting to ' + url);
        return this.http
            .post(url, JSON.stringify(tourney), { 'headers': this.headers })
            .toPromise()
            .then(function () {
            console.log('created');
            _this.router.navigate(['/viewtourneys']);
            return undefined;
        })
            .catch(this.handleCreateTourneyError);
    };
    TourneyService.prototype.deleteTourney = function (tourney) {
        var _this = this;
        var url = "" + this.tourneyAPIUrl + tourney.id;
        return this.http
            .delete(url)
            .toPromise()
            .then(function () {
            console.log('deleted');
            _this.router.navigate(['/viewtourneys']);
            return undefined;
        })
            .catch(this.handleDeleteTourneyError);
    };
    TourneyService.prototype.updateTourney = function (tourney) {
        var url = "" + this.tourneyAPIUrl;
        return this.http
            .put(url, JSON.stringify(tourney), { 'headers': this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleGetTourneyError);
    };
    TourneyService.prototype.getTourneys = function () {
        var url = "" + this.tourneyAPIUrl;
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleGetTourneysError);
    };
    TourneyService.prototype.getTourney = function (tourneyId) {
        var url = "" + this.tourneyAPIUrl + tourneyId;
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleGetTourneyError);
    };
    TourneyService.prototype.handleDeleteTourneyError = function (error) {
        console.log('An error occured = ', JSON.stringify(error));
        return Promise.resolve({});
    };
    TourneyService.prototype.handleGetTourneyError = function (error) {
        console.log('An error occured = ', JSON.stringify(error));
        return Promise.resolve(undefined);
    };
    TourneyService.prototype.handleGetTourneysError = function (error) {
        console.log('An error occured = ', JSON.stringify(error));
        return Promise.resolve([]);
    };
    TourneyService.prototype.handleCreateTourneyError = function (error) {
        console.log('An error occured = ', JSON.stringify(error));
        return Promise.resolve(undefined);
    };
    TourneyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, router_1.ActivatedRoute])
    ], TourneyService);
    return TourneyService;
}());
exports.TourneyService = TourneyService;
//# sourceMappingURL=tourney-service.js.map