import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private  iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup',
  };

  constructor() { }

  handle(token) {
     this.set(token);
     console.log(this.payload(token.access_token[1]));
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    return localStorage.removeItem('token');
  }

  payload(token) {
    return token.split('.')[1];
  }

  isValid() {
    const  token = this.get();

  }

  loggedIn() {
    return true;
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }
}
