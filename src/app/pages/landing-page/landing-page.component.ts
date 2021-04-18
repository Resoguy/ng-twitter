import { Component, OnInit } from '@angular/core';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  faTwitter = faTwitter;
  isSignupModalOpen: boolean = false;
  isLoginModalOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openSignupModal() {
    this.isSignupModalOpen = true;
  }

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

}
