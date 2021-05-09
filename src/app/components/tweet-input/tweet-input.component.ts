import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {faImage, faCalendarAlt, faSmile, faChartBar, faFileImage} from '@fortawesome/free-regular-svg-icons';
import {faGlobeAmericas, faTimes} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';
import {environment as env} from 'src/environments/environment';


@Component({
  selector: 'app-tweet-input',
  templateUrl: './tweet-input.component.html',
  styleUrls: ['./tweet-input.component.scss']
})
export class TweetInputComponent implements OnInit {
  @Input() rows: string = '5';
  @Input() parentTweet: any;
  @Input() type: string = 'tweet'; // 'reply' | 'retweet'
  @Output() onSuccess = new EventEmitter;
  @ViewChild('imgInput') imgInput: ElementRef;
  selectedImgUrl: string | ArrayBuffer;
  faGlobeAmericas = faGlobeAmericas;
  faTimes = faTimes;
  modalActions = [
    {icon: faImage, method: () => this.addImage()},
    {icon: faFileImage, method: this.addGif},
    {icon: faChartBar, method: this.addVote},
    {icon: faSmile, method: this.addEmoji},
    {icon: faCalendarAlt, method: this.addDate}
  ];
  tweetText = new FormControl('');
  isLoading: boolean = false;

  get profileImg() {
    return this.authService.profileImg;
  }

  constructor(
    private tweetService: TweetService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  sendTweet() {
    this.isLoading = true;

    const file = this.imgInput.nativeElement.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('files', file);

      return this.tweetService.uploadImage(formData)
        .subscribe(data => {
          const imgId = data[0].id;
          const newTweet: any = {
            text: this.tweetText.value,
            imgId
          }

          if (this.parentTweet && this.type === 'retweet') {
            newTweet.originalTweet = this.parentTweet.id
          }

          this.tweetService.sendTweet(newTweet)
            .subscribe(data => {
              this.tweetService.fetchTweets();
              this.tweetText.reset();
              this.imgInput.nativeElement.value = '';
              this.selectedImgUrl = null;
              this.isLoading = false;
              this.onSuccess.emit();
            })
        })
    }

    const newTweet: any = {
      text: this.tweetText.value,
    }

    if (this.parentTweet && this.type === 'retweet') {
      newTweet.originalTweet = this.parentTweet.id;
    }

    this.tweetService.sendTweet(newTweet)
      .subscribe(data => {
        this.tweetService.fetchTweets();
        this.tweetText.reset();
        this.isLoading = false;
        this.onSuccess.emit();
      })
  }

  replyTweet() {
    this.isLoading = true;

    this.tweetService.replyTweet(this.tweetText.value, this.parentTweet.id)
      .subscribe(data => {
        this.tweetService.fetchTweets();
        this.tweetText.reset();
        this.isLoading = false;
      });
  }

  selectImage() {
    const file = this.imgInput.nativeElement.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImgUrl = reader.result;
    }

    reader.readAsDataURL(file);
  }

  removeImgPreview() {
    this.selectedImgUrl = null;
    this.imgInput.nativeElement.value = '';
  }

  addImage() {
    this.imgInput.nativeElement.click();
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
