import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faArrowLeft, faMapMarkerAlt, faLink, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { extractProfileImg, queryMultiData } from 'src/app/shared/utils';
import {environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faLink = faLink;
  faCalendarAlt = faCalendarAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  isEditModalOpen: boolean = false;
  user: any = {};
  tweets: any[] = [];
  followers: any[] = [];
  profileTabs: any[] = [
    {title: 'Tweets', value: 't'},
    {title: 'Tweets & Replies', value: 't-r'},
    {title: 'Media', value: 'm'},
    {title: 'Likes', value: 'l'},
  ]
  selectedProfileTab: string = 't';

  get profileImg() {
    return extractProfileImg(this.user);
  }

  get followersImages() {
    return this.followers
            .filter((follow, index) => index < 3)
            .map(follow => extractProfileImg(follow.follower));
  }

  get isMyProfile() {
    return this.user.id === this.authService.user.id;
  }

  get userData() {
    return this.authService.user;
  }

  get isFollowing() {
    if (!this.authService.user.following) return false;

    return !!this.authService.findFollow(this.user.id);
  }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.fetchProfile(param.userId);
      this.fetchProfileTweets(param.userId);
      this.fetchProfileFollowers(param.userId);
    })
  }

  setProfileTab(selectedTabValue: string) {
    this.selectedProfileTab = selectedTabValue;
    const requests = {
      't': this.fetchProfileTweets.bind(this),
      't-r': this.fetchTweetsAndReplies.bind(this),
      'm': this.fetchMedia.bind(this),
      'l': this.fetchLikedTweets.bind(this)
    }

    const tabRequest = requests[selectedTabValue];
    tabRequest();
  }

  fetchProfile(id: string) {
    this.http.get(`${env.baseURL}/users/${id}`)
      .subscribe(data => this.user = data);
  }

  fetchProfileTweets(id: string = this.user.id) {
    this.http.get(`${env.baseURL}/tweets?user=${id}&&_sort=created_at:desc`)
      .subscribe((data: any) => this.tweets = data);
  }

  fetchTweetsAndReplies() {
    this.http.get(`${env.baseURL}/tweets?user=${this.user.id}`)
      .subscribe((tweets: any) => {
        this.http.get(`${env.baseURL}/replies?user=${this.user.id}`)
          .subscribe((replies: any) => {
            const tweetsAndReplies = [...tweets, ...replies];
            this.tweets = tweetsAndReplies.sort((a, b) => a.created_at < b.created_at ? 1 : -1);
          })
      })
  }

  fetchMedia() {
    this.http.get(`${env.baseURL}/tweets?user=${this.user.id}&&_sort=created_at:desc`)
      .subscribe((tweets: any) => this.tweets = tweets.filter(tweet => tweet.image));
  }

  fetchLikedTweets() {
    const queryString = queryMultiData(this.user.likes, 'tweet');

    this.http.get(`${env.baseURL}/tweets?${queryString}&&_sort=created_at:desc`)
      .subscribe((data: any) => this.tweets = data);
  }

  fetchProfileFollowers(id: string) {
    this.http.get(`${env.baseURL}/followers?user=${id}`)
      .subscribe((data: any) => this.followers = data);
  }

  openEditModal() {
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSuccessfulEdit() {
    this.fetchProfile(this.user.id);
    this.isEditModalOpen = false;
  }

  toggleFollow() {
    this.authService.toggleFollow(this.user.id);
  }

}
