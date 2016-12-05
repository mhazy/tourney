import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

import { Tourney } from '../../models/tourney-model';
import { TourneyState } from '../../models/tourney-state-model';
import { TourneyService } from '../../service/tourney-service';
import appActions from '../../actions/tourney-app-actions';

@Component({
  selector: 'create-new-tourney-container',
  templateUrl: './create-tourney-container.html',
})
export class CreateTourneyContainer implements OnInit {
  newTourney: Tourney;
  isEdit: boolean = false;
  createTourneyForm: FormGroup;
  formBuilder: FormBuilder;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (!id && id !== 0) {
        return;
      }
      this.isEdit = true;
    });
  }

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private tourneyService: TourneyService,
    private store: Store<AppState>,
    @Inject(FormBuilder) formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    store.select('tourney').subscribe((tourney: TourneyState) => { this.newTourney = tourney.tourney; this.initForm() });
  }

  private initForm() {
    console.log('init form() with tourney ' + JSON.stringify(this.newTourney));
    this.createTourneyForm = this.formBuilder.group({
      name: [
        (this.newTourney && this.newTourney.name) || '',
        [
          Validators.pattern('^(?=.{2,255}$)[A-Za-z0-9]*( ?[A-Za-z0-9\-])*$'),
          Validators.required
        ]
      ],
      description: [
        (this.newTourney && this.newTourney.description) || '',
        [
          Validators.maxLength(255)
        ]
      ],
      rules: [
        (this.newTourney && this.newTourney.rules) || '',
        [
        ]
      ],
      registration: this.formBuilder.group({
        start: [
          (this.newTourney && this.newTourney.registration && this.formatDateToString(this.newTourney.registration.start)) || this.formatDateToString(),
          [
            Validators.required
          ]
        ],
        end: [
          (this.newTourney && this.newTourney.registration && this.formatDateToString(this.newTourney.registration.end)) || '',
          [
          ]
        ]
      }),
      duration: this.formBuilder.group({
        start: [
          (this.newTourney && this.newTourney.duration && this.formatDateToString(this.newTourney.duration.start)) || this.formatDateToString(),
          [
            Validators.required
          ]
        ],
        end: [
          (this.newTourney && this.newTourney.duration && this.formatDateToString(this.newTourney.duration.end)) || '',
          [
          ]
        ]
      }),
      participants: this.formBuilder.group({
        min: [
          2,
          [
            Validators.required,
            this.validateInteger(2)
          ]
        ],
        max: [
          (this.newTourney && this.newTourney.participants && this.newTourney.participants.max) || 2,
          [
            this.validateInteger(2)
          ]
        ]
      }),
      schedule: [
        (this.newTourney && this.newTourney.schedule) || 'roundrobin',
        [
        ]
      ],
      playoffs: [
        (this.newTourney && this.newTourney.playoffs) || 'none',
        [
        ]
      ]
    });
  }

  private validateInteger(min: Number = 0, max: Number = Number.MAX_SAFE_INTEGER) {
    return (control: FormControl) => {
      return (
        control.value >= min && control.value <= max ?
          null :
          {
            maxInteger: {
              valid: false
            }
          }
      );
    };
  }

  private formatDateToString(date: Date = new Date()): string {
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
      _id: this.newTourney && this.newTourney._id || -1,
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
    this.createTourney(this.newTourney);
  }

  createTourney(newTourney: Tourney): void {
    if (this.isEdit) {
      this.tourneyService
        .updateTourney(newTourney)
        .then(() => {
           this.router.navigate(['/viewtourney/' + this.newTourney._id]);
         });
    } else {
      console.log('sending create tourney action');
      this.store.dispatch(appActions.tourneyActions.tourneyCreateAction(newTourney));
    }
  }

  goBack(): void {
    this.location.back();
  }
}
