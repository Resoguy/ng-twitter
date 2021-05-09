import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {environment as env} from 'src/environments/environment';
import {extractProfileImg} from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = {};
  jwt: string = null;

  constructor(
    private http: HttpClient
  ) { }

  get profileImg() {
    return extractProfileImg(this.user);
  }

  hasJwt() {
    return !!window.localStorage.getItem('jwt');
  }

  setJwt(jwt: string) {
    window.localStorage.setItem('jwt', jwt);
    this.jwt = jwt;
  }

  setUser(user: any) {
    this.user = user;
  }

  signup(signupData: any) {
    return this.http.post(`${env.baseURL}/auth/local/register`, signupData);
  }

  login(loginData: any) {
    return this.http.post(`${env.baseURL}/auth/local`, loginData);
  }

  tryLogin() {
    const jwt: string = window.localStorage.getItem('jwt');

    if (jwt) {
      this.fetchMe(jwt);
    }
  }

  fetchMe(jwt: string = this.jwt, successCb: () => void = null) {
    this.http.get(`${env.baseURL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }).subscribe((data: any) => {
      this.fetchUser(data.id);
      this.setJwt(jwt);

      if (successCb) successCb();
    })
  }

  fetchUser(userId: number) {
    this.http.get(`${env.baseURL}/users/${userId}`)
      .subscribe((data: any) => {
        this.setUser(data);
      })
  }

  logout() {
    window.localStorage.removeItem('jwt');
    this.user = null;
    this.jwt = null;
  }

  findFollow(userId: number) {
    return this.user.following.find(follow => follow.user === userId);
  }

  toggleFollow(userId: number) {
    const follow = this.findFollow(userId);
    // Eger takip ediyorsak unfollow yap
    if (follow) {
      this.http.delete(`${env.baseURL}/followers/${follow.id}`, {
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      }).subscribe(data => this.fetchUser(this.user.id))
    // Takip etmiyorsak follow yap
    } else {
      const newFollow = {
        follower: this.user.id,
        user: userId
      }

      this.http.post(`${env.baseURL}/followers`, newFollow, {
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      }).subscribe(data => this.fetchUser(this.user.id));
    }
  }

  fetchUserDetails(userId: number) {
    return this.http.get(`${env.baseURL}/users/${userId}`);
  } 
}
