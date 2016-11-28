import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tourney } from '../models/tourney-model';
import { ResponseMessage } from '../models/response-message-model';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { User } from '../models/user-model';

@Injectable()
export class TourneyService {
  private tourneyAPIUrl = 'http://localhost:8000/api/tourneys/';
  private headers = new Headers();
  private user: User;
  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    store.select('user').subscribe((user: User) => { this.user = user; this.getHeader(user) });
  }

  private getHeader(user: User) {
    this.headers = new Headers();
    this.headers.append('Authorization', 'Bearer ' + user.authToken);
    this.headers.append('Content-Type', 'application/json');
    return this.headers;
  }

  loginUser(user: User): Promise<User> {
    const url = 'http://localhost:8000/api/user/';
    return this.http
    .post(url, JSON.stringify(user), { headers: this.getHeader(user) })
    .toPromise()
    .then((response) => {
      const responseMessage = response.json();
      const returnedUser = JSON.parse(responseMessage.message);
      returnedUser.authToken = user.authToken;
      return returnedUser;
    })
    .catch(this.handleLoginUserError);
  }

  createTourney(tourney: Tourney): Promise<Tourney> {
    const url = `${this.tourneyAPIUrl}`;
    console.log('posting to ' + url);
    tourney.owner = this.user._id;
    return this.http
      .post(url, JSON.stringify(tourney), { headers: this.headers })
      .toPromise()
      .then(() => {
        return undefined;
      })
      .catch(this.handleCreateTourneyError);
  }

  deleteTourney(tourneyId: string): Promise<Tourney> {
    const url = `${this.tourneyAPIUrl}${tourneyId}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => {
        return undefined;
      })
      .catch(this.handleDeleteTourneyError);
  }

  updateTourney(tourney: Tourney): Promise<Tourney> {
    const url = `${this.tourneyAPIUrl}`;
    return this.http
      .put(url, JSON.stringify(tourney), { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleGetTourneyError);
  }

  getTourneys(): Promise<Tourney[]> {
    const url = `${this.tourneyAPIUrl}`;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(response => JSON.parse(response.json().message))
      .catch(this.handleGetTourneysError);
  }

  getTourney(tourneyId: string): Promise<Tourney> {
    const url = `${this.tourneyAPIUrl}${tourneyId}`;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(response => JSON.parse(response.json().message))
      .catch(this.handleGetTourneyError);
  }

  joinTourney(tourneyId: number, userId: number): Promise<ResponseMessage> {
    const url = `${this.tourneyAPIUrl}${tourneyId}/user/${userId}`;
    return this.http
      .put(url, '{}', { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleJoinTourneyError);
  }

  leaveTourney(tourneyId: number, userId: number): Promise<ResponseMessage> {
    const url = `${this.tourneyAPIUrl}${tourneyId}/user/${userId}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleLeaveTourneyError);
  }

  private handleLoginUserError(error: any): Promise<ResponseMessage> {
    console.log('An error occured = ', JSON.stringify(error));
    return Promise.resolve({ status: 'fail', message: JSON.stringify(error) });
  }

  private handleLeaveTourneyError(error: any): Promise<ResponseMessage> {
    console.log('An error occured = ', JSON.stringify(error));
    return Promise.resolve({ status: 'fail', message: JSON.stringify(error) });
  }

  private handleJoinTourneyError(error: any): Promise<ResponseMessage> {
    console.log('An error occured = ', JSON.stringify(error));
    return Promise.resolve({ status: 'fail', message: JSON.stringify(error) });
  }

  private handleDeleteTourneyError(error: any): Promise<Tourney> {
    console.log('An error occured = ', JSON.stringify(error));
    return Promise.resolve({});
  }

  private handleGetTourneyError(error: any): Promise<Tourney> {
    console.log('An error occured = ', JSON.stringify(error));
    return Promise.resolve(undefined);
  }

  private handleGetTourneysError(error: any): Promise<Tourney[]> {
    console.log('An error occured = ', JSON.stringify(error));
    return Promise.resolve([]);
  }

  private handleCreateTourneyError(error: any): Promise<Tourney> {
    console.log('An error occured = ', JSON.stringify(error));
    return Promise.resolve(undefined);
  }
}
