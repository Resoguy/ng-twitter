import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { extractProfileImg } from 'src/app/shared/utils';

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
    return extractProfileImg(this.user);
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
