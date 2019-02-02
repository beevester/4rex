import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../../services/http-calls.service';

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

  constructor(private httpCalls: HttpCallsService) { }

  onSubmit() {
      this.httpCalls.login(this.form).subscribe(
          data => console.log(data),
        error => console.log(error)
      );
  }

  handleError(error){
    this.error = error.error.error;
  }

  ngOnInit() {
  }
}
