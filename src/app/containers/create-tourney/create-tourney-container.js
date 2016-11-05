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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var tourney_1 = require('../../service/classes/tourney');
var tourney_service_1 = require('../../service/tourney-service');
var CreateTourneyContainer = (function () {
    function CreateTourneyContainer(router, route, tourneyService, formBuilder) {
        this.router = router;
        this.route = route;
        this.tourneyService = tourneyService;
        this.newTourney = new tourney_1.Tourney();
        this.isEdit = false;
        this.formBuilder = formBuilder;
        this.initForm();
    }
    CreateTourneyContainer.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id']; //+ converts the value to a number
            if (!id && id !== 0) {
                return;
            }
            _this.isEdit = true;
            _this.tourneyService.getTourney(id)
                .then(function (tourney) { console.log('go tourney = ' + JSON.stringify(tourney)); _this.newTourney = tourney; _this.initForm(); })
                .catch(function () { console.log('error getting all tourney'); return {}; });
        });
    };
    CreateTourneyContainer.prototype.initForm = function () {
        this.createTourneyForm = this.formBuilder.group({
            name: [
                this.newTourney.name || '',
                [
                    forms_1.Validators.pattern('^(?!.*[ ]{2})[A-Z0-9]([a-zA-Z0-9 ]{0,254})[^\W]$'),
                    forms_1.Validators.required
                ]
            ],
            description: [
                this.newTourney.description || '',
                [
                    forms_1.Validators.maxLength(255)
                ]
            ],
            rules: [
                this.newTourney.rules || '',
                []
            ],
            registration: this.formBuilder.group({
                start: [
                    this.newTourney.registration.start || this.getCurrentDate(),
                    [
                        forms_1.Validators.required
                    ]
                ],
                end: [
                    this.newTourney.registration.end || '',
                    []
                ]
            }),
            duration: this.formBuilder.group({
                start: [
                    this.newTourney.duration.start || this.getCurrentDate(),
                    [
                        forms_1.Validators.required
                    ]
                ],
                end: [
                    this.newTourney.duration.end || '',
                    []
                ]
            }),
            participants: this.formBuilder.group({
                min: [
                    this.newTourney.participants.min || 2,
                    [
                        forms_1.Validators.required,
                        this.validateInteger(2)
                    ]
                ],
                max: [
                    this.newTourney.participants.max || 2,
                    [
                        this.validateInteger(2)
                    ]
                ]
            }),
            schedule: [
                this.newTourney.schedule || 'roundrobin',
                []
            ],
            playoffs: [
                this.newTourney.playoffs || 'none',
                []
            ]
        });
    };
    CreateTourneyContainer.prototype.validateInteger = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = Number.MAX_SAFE_INTEGER; }
        return function (control) {
            return (control.value >= min && control.value <= max ?
                null :
                {
                    maxInteger: {
                        valid: false
                    }
                });
        };
    };
    CreateTourneyContainer.prototype.getCurrentDate = function () {
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getUTCDate();
        var currentDateString = '' +
            currentDate.getFullYear() +
            '-' +
            (currentMonth < 10 ? '0' + currentMonth : currentMonth) +
            '-' +
            (currentDay < 10 ? '0' + currentDay : currentDay);
        return currentDateString;
    };
    CreateTourneyContainer.prototype.onSubmit = function () {
        this.newTourney = {
            id: this.newTourney.id,
            name: this.createTourneyForm.value.name,
            description: this.createTourneyForm.value.description,
            rules: this.createTourneyForm.value.rules,
            registration: {
                start: this.createTourneyForm.value.registration.start,
                end: this.createTourneyForm.value.registration.end,
            },
            duration: {
                start: this.createTourneyForm.value.duration.start,
                end: this.createTourneyForm.value.duration.end,
            },
            participants: {
                min: this.createTourneyForm.value.participants.min,
                max: this.createTourneyForm.value.participants.max,
            },
            schedule: this.createTourneyForm.value.schedule,
            playoffs: this.createTourneyForm.value.playoffs,
        };
        console.log('form submitted:');
        console.log(JSON.stringify(this.newTourney));
        this.createTourney(this.newTourney);
    };
    CreateTourneyContainer.prototype.createTourney = function (newTourney) {
        if (this.isEdit) {
            this.tourneyService.updateTourney(newTourney).then(function (tourney) { return console.log('updated tourney'); });
        }
        else {
            this.tourneyService.createTourney(newTourney).then(function (tourney) { return console.log('created new tourney'); });
        }
    };
    CreateTourneyContainer = __decorate([
        core_1.Component({
            selector: 'create-new-tourney-container',
            templateUrl: './src/app/containers/create-tourney/create-tourney-container.html',
        }),
        __param(3, core_1.Inject(forms_1.FormBuilder)), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, tourney_service_1.TourneyService, forms_1.FormBuilder])
    ], CreateTourneyContainer);
    return CreateTourneyContainer;
}());
exports.CreateTourneyContainer = CreateTourneyContainer;
//# sourceMappingURL=create-tourney-container.js.map