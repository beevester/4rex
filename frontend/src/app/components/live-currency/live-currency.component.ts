import { Component, OnInit, Input } from '@angular/core';
import {Pairs} from '../interface/pairs';
import {HttpCallsService} from '../../services/http-calls.service';


@Component({
    selector: 'app-live-currency',
    templateUrl: './live-currency.component.html',
    styleUrls: ['./live-currency.component.css']
})
export class LiveCurrencyComponent implements OnInit {

    exchangeRate: Pairs;

    private error = [];

    constructor(private http: HttpCallsService) { }

    ngOnInit() {
        this.http.liveCurrency('live').subscribe(
            (data) => this.handleProcess(data),
            (error) => console.log(error)
        );
    }

    handleProcess(data) {
        this.exchangeRate = data;
    }

    // handleError(error) {
    //     this.error = error.error.error;
    // }
}
