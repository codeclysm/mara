import 'rxjs/add/operator/toPromise';

import * as Moment from 'moment';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

export interface Appointment{
  id: string;
  href: string;  // The url of the resource
  who: string;
  email: string;
  send_email: boolean;
  phone: string;
  send_sms: boolean;
  what: string;
  when: string;
  where: string;
  notes: string;
  urgent: boolean;
  problematic: boolean;
  status: string;
}

interface ListParams {
  where: string;
  date: Moment.Moment;
}

@Injectable()
export class CalendarService {
  public lastUpdated: string;

  constructor(private http: Http) { };

  list(params: ListParams): Promise<Appointment[]> {
    let url = 'http://api.marabinigomme.it/appointments?where=' + params.where;

    if (params.date) {
      let end = params.date.clone().add(6, 'days');
      url = url + '&start=' + params.date.toISOString() + '&end=' + end.toISOString();
    }

    let token = sessionStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(url, new RequestOptions({ headers: headers }))
      .toPromise()
      .then(response => response.json() as Appointment[])
      .catch(this.handleError);
  }

  get(id: string): Promise<Appointment> {
    if (id === 'new') {
      return Promise.resolve(this.empty());
    }
    let token = sessionStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get('http://api.marabinigomme.it/appointments/' + id, new RequestOptions({ headers: headers }))
      .toPromise()
      .then(response => response.json() as Appointment)
      .catch(this.handleError);
  }

  save(app: Appointment): Observable<Appointment> {
    let body = JSON.stringify(app);
    let token = sessionStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    let url = 'http://api.marabinigomme.it/appointments';
    let method = 'put';

    if (app.id) {
      url = url + '/' + app.id;
      method = 'post';
    }

    return this.http[method](url, body, new RequestOptions({headers: headers}))
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body;
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private empty(): Appointment {
    return {
      id: '',
      href: '',
      who: '',
      email: '',
      send_email: false,
      phone: '',
      send_sms: false,
      what: '',
      when: Moment().local().format(),
      where: 'budrio',
      notes: '',
      urgent: false,
      problematic: false,
      status: 'todo',
    };
  }
}