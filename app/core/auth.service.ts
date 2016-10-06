import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable }     from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private http: Http) { };

  logged(): boolean {
    let token = sessionStorage.getItem('token');
    return token !== '';
  }

  login(username: string, password: string) {
    let body = JSON.stringify({user: username, password: password})
    return this.http.post('http://api.marabinigomme.it/auth/login', body, new RequestOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    sessionStorage.setItem('token', body.token);
    return body.token || { };
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
