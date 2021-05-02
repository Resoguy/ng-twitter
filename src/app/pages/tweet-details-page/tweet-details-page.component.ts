import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-tweet-details-page',
  templateUrl: './tweet-details-page.component.html',
  styleUrls: ['./tweet-details-page.component.scss']
})
export class TweetDetailsPageComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  tweet: any = null;
  replies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.fetchTweet(param.tweetId);
      this.fetchReplies(param.tweetId);
    })
  }

  fetchTweet(tweetId: string) {
    this.http.get(`${env.baseURL}/tweets/${tweetId}`)
      .subscribe(data => this.tweet = data);
  }

  fetchReplies(tweetId: string) {
    this.http.get(`${env.baseURL}/replies?tweet=${tweetId}&&_sort=created_at:desc`)
      .subscribe((data: any) => this.replies = data);
  }

}
