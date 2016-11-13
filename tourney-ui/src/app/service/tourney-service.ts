import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tourney } from '../models/tourney-model';
import { ResponseMessage } from '../models/response-message-model';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TourneyService {
  private tourneyAPIUrl = 'http://localhost:8000/api/tourneys/';
  private headers = new Headers();

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private getHeader() {
    const header = new Headers();
    header.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    header.append('Content-Type', 'application/json');
    return header;
  }

  createTourney(tourney: Tourney): Promise<Tourney> {
    const url = `${this.tourneyAPIUrl}`;
    console.log('posting to ' + url);
    return this.http
      .post(url, JSON.stringify(tourney), { headers: this.getHeader() })
      .toPromise()
      .then(() => {

        console.log('created');
        return undefined;
      })
      .catch(this.handleCreateTourneyError);
  }

  deleteTourney(tourney: Tourney): Promise<Tourney> {
    const url = `${this.tourneyAPIUrl}${tourney.id}`;
    return this.http
      .delete(url, {headers: this.getHeader()})
      .toPromise()
      .then(() => {
        console.log('deleted'); return undefined;
      })
      .catch(this.handleDeleteTourneyError);
  }

  updateTourney(tourney: Tourney): Promise<Tourney> {
    const url = `${this.tourneyAPIUrl}`;
    return this.http
      .put(url, JSON.stringify(tourney), { headers: this.getHeader() })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleGetTourneyError);
  }

  getTourneys(): Promise<Tourney[]> {
    const url = `${this.tourneyAPIUrl}`;
    return this.http
      .get(url, {headers: this.getHeader()})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleGetTourneysError);
  }

  getTourney(tourneyId: number): Promise<Tourney> {
    const url = `${this.tourneyAPIUrl}${tourneyId}`;
    return this.http
      .get(url, {headers: this.getHeader()})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleGetTourneyError);
  }

  joinTourney(tourneyId: number, userId: number): Promise<ResponseMessage> {
    const url = `${this.tourneyAPIUrl}${tourneyId}/user/${userId}`;
    return this.http
      .put(url, '{}', { headers: this.getHeader() })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleJoinTourneyError);
  }

  leaveTourney(tourneyId: number, userId: number): Promise<ResponseMessage> {
    const url = `${this.tourneyAPIUrl}${tourneyId}/user/${userId}`;
    return this.http
      .delete(url, {headers: this.getHeader()})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleLeaveTourneyError);
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
