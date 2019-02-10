import {Component, OnInit} from '@angular/core';
import {Pairs} from '../interface/pairs';
import {HttpCallsService} from '../../services/http-calls.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    exchangeRate: Pairs;

    constructor(private http: HttpCallsService) { }

    ngOnInit() {
        this.currencyUpdate();
        console.log(this.exchangeRate);
    }

    currencyUpdate() {
        this.http.liveCurrency('live').subscribe(
            data => this.handleResponse(data),
            error => console.log(error.error)
        );
    }

    handleResponse(data) {
        console.log(data);
        this.exchangeRate = data;
    }

}
