import { Component, OnInit } from '@angular/core';
import {HttpCallsService} from '../../services/http-calls.service';
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {AuthenticationService} from "../../services/authentication.service";
import {SnotifyService} from "ng-snotify";

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
    post_code: null,
    // password_confirmation: null,

  };

  public error = [];

  constructor( private httpCalls: HttpCallsService,
               private route: Router,
               private token: TokenService,
               private auth: AuthenticationService,
               private sn: SnotifyService,
  ) { }

  onSubmit() {
      this.httpCalls.signUp(this.form).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
      );
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  handleResponse(data) {
    this.sn.success('Congradulations the account is setup you can login now', {
      buttons: [
        {text: 'Go to login'}
      ]
    })

  }
  ngOnInit() {
  }

}
