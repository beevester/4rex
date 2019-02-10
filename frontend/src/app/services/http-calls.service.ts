import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  signUp(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }

  liveCurrency(endpoint) {
    return this.http.post(`${this.baseUrl}/live-currency`, endpoint);
  }

  calculate(quotation) {
    return this.http.post(`${this.baseUrl}/calculate`, quotation);
  }

  purchase(data) {
    return this.http.post(`${this.baseUrl}/calculate`, data);
  }

  currentUser() {
      return this.http.get(`${this.baseUrl}/currentUser`);
  }
}
