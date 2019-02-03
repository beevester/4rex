import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private loggedIn: boolean;
  constructor(
    private auth: AuthenticationService,
    private route: Router,
    private token: TokenService,
  ) { }

  ngOnInit() {
   this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(evant: MouseEvent) {
    event.preventDefault();
    this.auth.changeAuthStatus(false);
    this.token.remove();
    this.route.navigateByUrl('/login');
  }


}
