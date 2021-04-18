import { Component, OnInit } from '@angular/core';
import {faHashtag, faHome, faSearch} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twitter-fe';
  faHashtag = faHashtag;
  faHome = faHome;
  faBell = faBell;
  faSearch = faSearch;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.tryLogin();
  }
}
