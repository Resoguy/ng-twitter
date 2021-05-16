import { Component, Input, OnInit } from '@angular/core';
import {faHeart, faComment} from '@fortawesome/free-regular-svg-icons';
import {faTrash, faTimes, faEllipsisH, faRetweet, faShareSquare, faHeart as faFullHeart} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';
import { extractProfileImg } from 'src/app/shared/utils';
import {environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() size: string = 'md';
  @Input() type: string = 'tweet';
  @Input() isRetweet: boolean = false;
  @Input() tweet: any;
  tweetOwner: any = {};
  faTimes = faTimes;
  faComment = faComment;
  faHeart = faHeart;
  faFullHeart = faFullHeart;
  faEllipsisH = faEllipsisH;
  faRetweet = faRetweet;
  faShare = faShareSquare;
  isReplyModalOpen: boolean = false;
  isImgModalOpen: boolean = false;
  isRetweetModalOpen: boolean = false;
  menuItems: any[] = [
    {text: 'Delete', icon: faTrash, callback: () => this.deleteTweet()}
  ]

  get hasOriginalTweet(): boolean {
    return !!this.tweet.originalTweet;
  }

  get isRetweetedByMe(): boolean {
    if (this.type === 'reply') return;

    return !!this.tweet.retweets.find(retweet => retweet.user === this.user.id);
  }

  get isLikedByMe(): boolean {
    if (this.type === 'reply') return;

    return !!this.tweet.likes.find(like => like.user === this.user.id);
  }

  get isOwner(): boolean {
    const userId = this.authService.user.id;
    const tweetUser = this.tweet.user.id;

    return userId === tweetUser;
  }

  get tweetOwnerName() {
    return this.isRetweet ? 
      this.tweetOwner.username :
      this.tweet.user.username;
  }

  get tweetOwnerUsername() {
    return this.isRetweet ?
      this.tweetOwner.email :
      this.tweet.user.email;
  }

  get tweetImg(): string {
    if (!this.tweet.image) return null;

    return `${env.baseURL}${this.tweet.image.url}`
  }

  get replyCount() {
    if (!this.tweet.replies) return 0;

    return this.tweet.replies.length;
  }

  get retweetCount() {
    if (!this.tweet.retweets) return 0;

    return this.tweet.retweets.length;
  }

  get likeCount() {
    if (!this.tweet.likes) return 0;

    return this.tweet.likes.length;
  }

  get profileImg() {
    if (this.isRetweet) return extractProfileImg(this.tweetOwner);

    return extractProfileImg(this.tweet.user);
  }

  get user() {
    return this.authService.user;
  }

  constructor(
    private tweetService: TweetService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.isRetweet) {
      const userId = this.tweet.user;

      this.authService.fetchUserDetails(userId)
        .subscribe(userData => this.tweetOwner = userData);
    }
  }

  closeReplyModal() {
    this.isReplyModalOpen = false;
  }

  replyTweet(event) {
    event.stopPropagation();
    if (this.type === 'reply') return;

    this.isReplyModalOpen = true;
  }

  retweet() {
    if (this.type === 'reply') return;

    this.tweetService.retweet(this.tweet.id);
  }

  undoRetweet(event) {
    event.stopPropagation();
    if (this.type === 'reply') return;

    const retweet = this.tweet.retweets.find(retweet => retweet.user === this.user.id);

    this.tweetService.undoRetweet(retweet);
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

  shareTweet(event) {
    event.stopPropagation();

  }

  openImgModal(event) {
    event.stopPropagation();
    this.isImgModalOpen = true;
  }

  closeImgModal() {
    this.isImgModalOpen = false;
  }

  deleteTweet() {
    this.tweetService.deleteTweet(this.tweet);
  }

  openRetweetModal(event) {
    event.stopPropagation();

    this.isRetweetModalOpen = true;
  }

  closeRetweetModal() {
    this.isRetweetModalOpen = false;
  }

}
