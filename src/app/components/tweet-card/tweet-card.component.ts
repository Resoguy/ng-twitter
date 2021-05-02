import { Component, Input, OnInit } from '@angular/core';
import {faHeart, faComment} from '@fortawesome/free-regular-svg-icons';
import {faChevronDown, faTimes} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';
import {environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() size: string = 'md';
  @Input() type: string = 'tweet';
  @Input() tweet: any;
  faTimes = faTimes;
  faComment = faComment;
  faHeart = faHeart;
  faChevronDown = faChevronDown;
  isReplyModalOpen: boolean = false;

  get replyCount() {
    if (!this.tweet.replies) return 0;

    return this.tweet.replies.length;
  }

  get likeCount() {
    if (!this.tweet.likes) return 0;

    return this.tweet.likes.length;
  }

  get profileImg() {
    try {
      const imgUrl = this.tweet.user.profileImg.formats.thumbnail.url;

      return `${env.baseURL}${imgUrl}`;
    } catch {
      return env.placeholderProfileImg;
    }
  }

  get user() {
    return this.authService.user;
  }

  constructor(
    private tweetService: TweetService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  closeReplyModal() {
    this.isReplyModalOpen = false;
  }

  replyTweet(event) {
    event.stopPropagation();
    if (this.type === 'reply') return;

    this.isReplyModalOpen = true;
  }

  likeTweet(event) {
    event.stopPropagation();
    if (this.type === 'reply') return;

    const isLikedByMe = this.tweet.likes.find(like => like.user === this.user.id);

    if (isLikedByMe) {
      this.tweetService.dislikeTweet(isLikedByMe.id);
    } else {
      this.tweetService.likeTweet(this.tweet.id);
    }
  }

}
