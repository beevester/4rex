import { Component, OnInit } from '@angular/core';
import {HttpCallsService} from '../../services/http-calls.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    email: null,
    address: null,
    address2: null,
    password: null,
    state: null,
    city: null,
    post_cost: null,
    password_confirmation: null,

  };

  public error = [];

  constructor(private httpCalls: HttpCallsService) { }

  onSubmit() {
      this.httpCalls.signUp(this.form).subscribe(
          data => console.log(data),
          error => this.handleError(error)
      );
  }

  handleError(error) {
      return this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
