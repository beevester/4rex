import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../../services/http-calls.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private httpCalls: HttpCallsService,
    private route: Router,
    private token: TokenService,
    private auth: AuthenticationService,
    ) { }

  onSubmit() {
      this.httpCalls.login(this.form).subscribe(
          data => this.handleResponse(data),
        error => console.log(error)
      );
  }

  handleError(error) {
    this.error = error.error.error;
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(this.token.loggedIn());
    this.route.navigateByUrl('/profile');
  }
  ngOnInit() {
  }
}
