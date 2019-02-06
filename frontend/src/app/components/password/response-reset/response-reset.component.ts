import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpCallsService} from '../../../services/http-calls.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  private error = [];
  public  form = {
    email: null,
    password: null,
    resetToken: null
  };
  constructor(
    private route: ActivatedRoute,
    private http: HttpCallsService) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.changePassword(this.form).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

}
