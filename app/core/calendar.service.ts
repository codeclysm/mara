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

@Injectable()
export class CalendarService {
  constructor(private http: Http) { };

  get(id: string): Promise<Appointment> {
    if (id === 'new') {
      return Promise.resolve(this.empty());
    }
  }

  save(app: Appointment): Observable<void> {
    let body = JSON.stringify(app);
    let token = sessionStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.put('http://api.marabinigomme.it/appointments', body, new RequestOptions({headers: headers}))
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    console.debug(body);
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
      when: '',
      where: '',
      notes: '',
      urgent: false,
      problematic: false,
      status: 'todo',
    };
  }
}