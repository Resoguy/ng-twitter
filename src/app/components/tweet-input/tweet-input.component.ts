import { Component, Input, OnInit } from '@angular/core';
import {faImage, faCalendarAlt, faSmile, faChartBar, faFileImage} from '@fortawesome/free-regular-svg-icons';
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tweet-input',
  templateUrl: './tweet-input.component.html',
  styleUrls: ['./tweet-input.component.scss']
})
export class TweetInputComponent implements OnInit {
  @Input() rows: string = '5';
  faGlobeAmericas = faGlobeAmericas;
  modalActions = [
    {icon: faImage, method: this.addImage},
    {icon: faFileImage, method: this.addGif},
    {icon: faChartBar, method: this.addVote},
    {icon: faSmile, method: this.addEmoji},
    {icon: faCalendarAlt, method: this.addDate}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addImage() {

  }

  addGif() {

  }

  addVote() {

  }

  addEmoji() {

  }

  addDate() {
    
  }

}
