import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {faImage, faCalendarAlt, faSmile, faChartBar, faFileImage} from '@fortawesome/free-regular-svg-icons';
import {faGlobeAmericas, faTimes} from '@fortawesome/free-solid-svg-icons';
import { TweetService } from 'src/app/services/tweet.service';


@Component({
  selector: 'app-tweet-input',
  templateUrl: './tweet-input.component.html',
  styleUrls: ['./tweet-input.component.scss']
})
export class TweetInputComponent implements OnInit {
  @Input() rows: string = '5';
  @Input() parentTweet: any;
  @ViewChild('imgInput') imgInput: ElementRef;
  selectedImgUrl: any;
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

  constructor(
    private tweetService: TweetService
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

          this.tweetService.sendTweet(this.tweetText.value, imgId)
            .subscribe(data => {
              this.tweetService.fetchTweets();
              this.tweetText.reset();
              this.imgInput.nativeElement.value = '';
              this.selectedImgUrl = null;
              this.isLoading = false;
            })
        })
    }

    this.tweetService.sendTweet(this.tweetText.value)
      .subscribe(data => {
        this.tweetService.fetchTweets();
        this.tweetText.reset();
        this.isLoading = false;
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
