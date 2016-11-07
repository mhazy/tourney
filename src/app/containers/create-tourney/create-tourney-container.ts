import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Tourney } from '../../service/classes/tourney';
import { TourneyService } from '../../service/tourney-service';


@Component({
    selector: 'create-new-tourney-container',
    templateUrl: './src/app/containers/create-tourney/create-tourney-container.html',
})
export class CreateTourneyContainer implements OnInit{
    newTourney: Tourney = new Tourney();
    isEdit: boolean = false;
    createTourneyForm: FormGroup;
    formBuilder: FormBuilder;

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id']; //+ converts the value to a number
            if(!id && id !== 0){
                return;
            }
            this.isEdit = true;
            this.tourneyService.getTourney(id)
            .then(tourney => {console.log('go tourney = ' + JSON.stringify(tourney)); this.newTourney = tourney; this.initForm()})
            .catch(() => {console.log('error getting all tourney'); return {}});
        })
    }
    
    constructor(
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private tourneyService: TourneyService,
        @Inject(FormBuilder) formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.initForm();
    }

    private initForm(){
               this.createTourneyForm = this.formBuilder.group({
            name: [
                this.newTourney.name || '',
                [
                    Validators.pattern('^(?!.*[ ]{2})[A-Z0-9]([a-zA-Z0-9 ]{0,254})[^\W]$'),
                    Validators.required
                ]
            ],
            description: [
                this.newTourney.description || '',
                [
                    Validators.maxLength(255)
                ]
            ],
            rules: [
                this.newTourney.rules || '',
                [
                ]
            ],
            registration: this.formBuilder.group({
                start: [
                    this.newTourney.registration.start || this.getCurrentDate(),
                    [
                        Validators.required
                    ]
                ],
                end: [
                    this.newTourney.registration.end || '',
                    [
                    ]
                ]
            }),
            duration: this.formBuilder.group({
                start: [
                    this.newTourney.duration.start || this.getCurrentDate(),
                    [
                        Validators.required
                    ]
                ],
                end: [
                    this.newTourney.duration.end || '',
                    [
                    ]
                ]
            }),
            participants: this.formBuilder.group({
                min: [
                    this.newTourney.participants.min || 2,
                    [
                        Validators.required,
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
                [
                ]
            ],
            playoffs: [
                this.newTourney.playoffs || 'none',
                [
                ]
            ]
        })
    }
    
    private validateInteger(min: Number = 0, max: Number = Number.MAX_SAFE_INTEGER){
        return (control: FormControl) => {
            return (
                control.value >= min && control.value <= max ?
                null :
                {
                    maxInteger : {
                        valid: false
                    }
                }
            )
        }
    }

    private getCurrentDate(): string {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getUTCDate();
        const currentDateString = '' +
            currentDate.getFullYear() +
            '-' +
            (currentMonth < 10 ? '0' + currentMonth : currentMonth) +
            '-' +
            (currentDay < 10 ? '0' + currentDay : currentDay);
        return currentDateString;
    }

    onSubmit(): void {
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

        }
        console.log('form submitted:');
        console.log(JSON.stringify(this.newTourney));
        this.createTourney(this.newTourney);
        
    }

    createTourney(newTourney: Tourney): void {
        if(this.isEdit){
            this.tourneyService.updateTourney(newTourney).then(tourney=>console.log('updated tourney')).then(()=>alert('updated'));
        }else {
            this.tourneyService.createTourney(newTourney).then(tourney=>console.log('created new tourney')).then(() => this.goBack());
        }
    }
    goBack(): void {
      this.location.back();
    }
}