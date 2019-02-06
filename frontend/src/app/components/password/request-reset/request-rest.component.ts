import { Component, OnInit } from '@angular/core';
import {HttpCallsService} from '../../../services/http-calls.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-rest',
  templateUrl: './request-rest.component.html',
  styleUrls: ['./request-rest.component.css']
})
export class RequestRestComponent implements OnInit {

  private form = {
    email: null
  };
  constructor(private http: HttpCallsService, private notify: SnotifyService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.sendPasswordResetLink(this.form).subscribe(
        data => this.handleResponse(data['token']),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.form.email = null;
  }
}
