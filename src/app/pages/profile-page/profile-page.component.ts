import { Component, OnInit } from '@angular/core';
import {faArrowLeft, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faMapMarkerAlt = faMapMarkerAlt;
  tweets: any[] = [
    {
      id: 1, 
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam excepturi nam eum suscipit, doloribus totam ullam in eaque tenetur! Expedita at quisquam corrupti similique maxime, molestias perferendis quia mollitia esse.',
      created_at: '18h',
      user: {
        id: 1,
        name: 'Jake',
        username: '@jakeuser',
        imgUrl: 'https://unsplash.it/50/50'
      }
    },
    {
      id: 2, 
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam excepturi nam eum suscipit, doloribus totam ullam in eaque tenetur! Expedita at quisquam corrupti similique maxime, molestias perferendis quia mollitia esse.',
      created_at: '8h',
      user: {
        id: 2,
        name: 'Jane',
        username: '@janeuser',
        imgUrl: 'https://unsplash.it/50/51'
      }
    },
    {
      id: 3, 
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam excepturi nam eum suscipit, doloribus totam ullam in eaque tenetur! Expedita at quisquam corrupti similique maxime, molestias perferendis quia mollitia esse.',
      created_at: '12h',
      user: {
        id: 3,
        name: 'Bob',
        username: '@bobuser',
        imgUrl: 'https://unsplash.it/51/50'
      }
    },
  ];
  followersImages: any[] = [
    'https://unsplash.it/18/18',
    'https://unsplash.it/18/19',
    'https://unsplash.it/19/18'
  ];
  profileTabs: any[] = [
    {title: 'Tweets', value: 't'},
    {title: 'Tweets & Replies', value: 't-r'},
    {title: 'Media', value: 'm'},
    {title: 'Likes', value: 'l'},
  ]
  selectedProfileTab: string = 't';

  constructor() { }

  ngOnInit(): void {
  }

  setProfileTab(selectedTabValue) {
    this.selectedProfileTab = selectedTabValue;
  }

}
