import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment as env} from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TweetService {
  feed: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  fetchTweets() {
    this.http.get(`${env.baseURL}/tweets?_sort=created_at:desc`)
      .subscribe((data: any) => this.feed = data);
  }

  sendTweet(newTweet: any) {
    const {user, jwt} = this.authService;

    return this.http.post(`${env.baseURL}/tweets`, {...newTweet, user: user.id}, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
  }

  replyTweet(text: string, parentTweetId: number) {
    const {user, jwt} = this.authService;
    const newReply = {
      text,
      user: user.id,
      tweet: parentTweetId
    }

    return this.http.post(`${env.baseURL}/replies`, newReply, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
  }

  likeTweet(tweetId: number) {
    const {user, jwt} = this.authService;
    const newLike = {
      user: user.id,
      tweet: tweetId
    }

    this.http.post(`${env.baseURL}/likes`, newLike, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }).subscribe(data => this.fetchTweets());
  }

  dislikeTweet(likeId: number) {
    const {jwt} = this.authService;

    this.http.delete(`${env.baseURL}/likes/${likeId}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }).subscribe(data => this.fetchTweets());
  }

  uploadImage(formData) {
    return this.http.post(`${env.baseURL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${this.authService.jwt}`
      }
    })
  }

  deleteTweet({id, originalTweet}) {
    const config = {
      headers: {
        Authorization: `Bearer ${this.authService.jwt}`
      }
    };
    
    this.http.delete(`${env.baseURL}/tweets/${id}`, config).subscribe(data => {
      if (!originalTweet) return this.fetchTweets();

      this.http.get(`${env.baseURL}/retweets?user=${this.authService.user.id}&&tweet=${originalTweet.id}`)
        .subscribe(data => {
          const retweetToDelete = data[0];

          if (!retweetToDelete) return this.fetchTweets();

          this.http.delete(`${env.baseURL}/retweets/${retweetToDelete.id}`, config)
            .subscribe(data => this.fetchTweets());
        })
    })
  }

  retweet(tweetId: number) {
    const newRetweet = {
      user: this.authService.user.id,
      tweet: tweetId
    }

    this.http.post(`${env.baseURL}/retweets`, newRetweet, {
      headers: {
        Authorization: `Bearer ${this.authService.jwt}`
      }
    }).subscribe(data => this.fetchTweets())
  }

  undoRetweet({id, user, tweet}) {
    const {jwt} = this.authService;
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }

    this.http.get(`${env.baseURL}/tweets?user=${user}&&originalTweet=${tweet}`)
      .subscribe(data => {
        const tweetToDelete = data[0];

        if (!tweetToDelete) return;

        this.http.delete(`${env.baseURL}/tweets/${tweetToDelete.id}`, config)
          .subscribe(data => {
            this.http.delete(`${env.baseURL}/retweets/${id}`, config)
              .subscribe(data => {
                this.fetchTweets();
              })
          })
      });
  }
}
