import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() user: any;

  get isFollowing() {
    if (!this.authService.user.following) return false;

    return !!this.authService.findFollow(this.user.id);
  }

  get profileImg() {
    try {
      const imgUrl = this.user.profileImg.formats.thumbnail.url;

      return `${env.baseURL}${imgUrl}`;
    } catch {
      return env.placeholderProfileImg;
    }
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  toggleFollow() {
    this.authService.toggleFollow(this.user.id);
  }

}
