import { Component, OnInit } from '@angular/core';
import {faJediOrder} from '@fortawesome/free-brands-svg-icons';
import { TweetService } from 'src/app/services/tweet.service';


@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {
  faJediOrder = faJediOrder;
  
  get tweets() {
    return this.tweetService.feed;
  }

  constructor(
    private tweetService: TweetService
  ) { }

  ngOnInit(): void {
    this.tweetService.fetchTweets();
  }

}
