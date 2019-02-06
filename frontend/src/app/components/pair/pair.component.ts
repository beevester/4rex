import {Component, Input, OnInit} from '@angular/core';
import {Pairs} from '../interface/pairs';

@Component({
  selector: 'app-pair',
  templateUrl: './pair.component.html',
  styleUrls: ['./pair.component.css']
})
export class PairComponent implements OnInit {

  @Input() pair: Pairs
  constructor() { }

  ngOnInit() {
  }

}
