import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-recommended-users',
  templateUrl: './recommended-users.component.html',
  styleUrls: ['./recommended-users.component.scss']
})
export class RecommendedUsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`${env.baseURL}/users?_limit=3&&_sort=created_at:desc`)
      .subscribe((data: any) => this.users = data);
  }

}
