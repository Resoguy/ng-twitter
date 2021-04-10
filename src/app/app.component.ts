import { Component } from '@angular/core';
import {faHashtag, faHome, faSearch} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-fe';
  faHashtag = faHashtag;
  faHome = faHome;
  faBell = faBell;
  faSearch = faSearch;
}
