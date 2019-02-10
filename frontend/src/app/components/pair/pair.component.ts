import { Component, OnInit, Input } from '@angular/core';
import { Pairs } from '../interface/pairs';
import { HttpCallsService } from '../../services/http-calls.service';
import { TokenService } from '../../services/token.service';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pair',
    templateUrl: './pair.component.html',
    styleUrls: ['./pair.component.css']
})
export class PairComponent implements OnInit {
    @Input() t: Pairs;
    exchangeRate: Pairs;
    option = 'buy';

    private error ;
    selectedRate: string;
    private quotation = {
        option: 'buy',
    };

    constructor(
        private http: HttpCallsService,
        private token: TokenService,
        private sn: SnotifyService,
        private route: Router) { }

    ngOnInit() {
        this.http.liveCurrency(this.quotation).subscribe(
            (data) => this.handleProcess(data),
            (error) => this.handleError(error)
        );
    }

    handleProcess(data) {
        this.exchangeRate = data;
    }

    handleError(error) {
        this.sn.error(error, {
            pauseOnHover: true,
        });
    }

    buyOption() {
        this.option = 'buy';
        this.quotation.option = 'buy';
    }

    sellOption() {
        this.option = 'sell';
        this.quotation.option = 'sell';
    }
    calculate() {
        this.quotation.option = this.option;
        this.http.calculate(this.quotation).subscribe(
            (data) => console.log(data),
            (error) => console.log(error)
        );
    }

    purchase(data) {
        const user = this.token.get();
        console.log(data);
        console.log(this.token.payload(user));
    }
}
