import { Component, OnInit } from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  searchText = new FormControl('');
  faSearch = faSearch;
  adImages: any[] = [
    {imgUrl: 'https://unsplash.it/120/100'},
    {imgUrl: 'https://unsplash.it/120/101'},
    {imgUrl: 'https://unsplash.it/121/100'},
    {imgUrl: 'https://unsplash.it/121/101'},
    {imgUrl: 'https://unsplash.it/120/99'},
    {imgUrl: 'https://unsplash.it/119/100'},
  ]
  trends: any[] = [
    {id: 1, category: 'Category 1', hashtag: 'Hashtag 1', tweetCount: '13.3'},
    {id: 2, category: 'Category 2', hashtag: 'Hashtag 2', tweetCount: '12.2'},
    {id: 3, category: 'Category 3', hashtag: 'Hashtag 3', tweetCount: '15.5'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
