import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject< Boolean >(this.token.loggedIn());

  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: Boolean) {
    this.loggedIn.next(value);
  }
  constructor(private token: TokenService) { }
}
