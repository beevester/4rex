import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private  iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup',
  };
  private decodedPayload = null;

  constructor() { }

  handle(token) {
     this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    const token = localStorage.getItem('token');
    return token;
  }

  remove() {
    return localStorage.removeItem('token');
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  userInfo(token) {
    const payload = token.split('.')[2];
    return payload;
  }

  isValid() {
    const token = this.get();

    if (token) {
       const payload = this.payload(token).iss;

      if (payload === this.iss.login) {
          return true;
      }
    }
    return false;
  }

  loggedIn() {
    console.log(this.isValid());
    return this.isValid();
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }
}
