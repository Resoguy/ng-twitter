import { Component, Input, OnInit } from '@angular/core';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trend-item',
  templateUrl: './trend-item.component.html',
  styleUrls: ['./trend-item.component.scss']
})
export class TrendItemComponent implements OnInit {
  faChevronDown = faChevronDown;
  @Input() trend: any;

  constructor() { }

  ngOnInit(): void {
  }

}
