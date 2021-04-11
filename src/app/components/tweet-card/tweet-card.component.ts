import { Component, Input, OnInit } from '@angular/core';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() tweet: any;
  faHeart = faHeart;
  faChevronDown = faChevronDown;

  constructor() { }

  ngOnInit(): void {
  }

}
