import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RequestRestComponent} from './components/password/request-reset/request-rest.component';
import {ResponseResetComponent} from './components/password/response-reset/response-reset.component';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
import {LiveCurrencyComponent} from './components/live-currency/live-currency.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'request-password-reset',
    component: RequestRestComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'live-currency',
    component: LiveCurrencyComponent,
    canActivate: [AfterLoginService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
