import { Component, OnInit } from '@angular/core';
import {HttpCallsService} from '../../../services/http-calls.service';
import {SnotifyService} from 'ng-snotify';
import {Router} from '@angular/router';

@Component({
  selector: 'app-request-rest',
  templateUrl: './request-rest.component.html',
  styleUrls: ['./request-rest.component.css']
})
export class RequestRestComponent implements OnInit {

  private form = {
    email: null
  };
  constructor(
      private http: HttpCallsService,
      private notify: SnotifyService,
      private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.sendPasswordResetLink(this.form).subscribe(
        data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(response) {
    this.notify.confirm('The reset email was sent to your email', response);
    console.log('sent');
  }
}
