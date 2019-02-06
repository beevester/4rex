import { Component, OnInit } from '@angular/core';
import {HttpCallsService} from '../../services/http-calls.service';
import {Pairs} from '../interface/pairs';

@Component({
  selector: 'app-live-currency',
  templateUrl: './live-currency.component.html',
  styleUrls: ['./live-currency.component.css']
})
export class LiveCurrencyComponent implements OnInit {

  exchangeRate: Pairs;
  selectedPair: Pairs;

  constructor(private http: HttpCallsService) { }

  ngOnInit() {
    this.currencyUpdate();
  }

  currencyUpdate() {
    this.http.liveCurrency('live').subscribe(
      data => this.handleResponse(data),
      error => console.log(error)
    );
  }

  handleResponse(data) {
    console.log(data);
    this.exchangeRate = data;
  }

  showQuote(quote) {
    this.selectedPair = quote;
  }

}
