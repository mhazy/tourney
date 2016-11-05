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
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Tourney';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app2',
            template: "\n       <div>\n        <img src=\"./resources/logo.png\" style=\"display:inline; vertical-align: middle;\">\n        <h1 style=\"display:inline; vertical-align: middle;\">{{title}}</h1>\n      </div>\n      <div>\n        <a routerLink=\"/viewtourneys\">View Tourneys</a>\n        <a routerLink=\"/createtourney\">Create New Tourney</a>\n      </div>\n      <router-outlet></router-outlet>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map