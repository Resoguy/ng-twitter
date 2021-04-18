import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = null;
  jwt: string = null;

  constructor(
    private http: HttpClient
  ) { }

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

  fetchMe(jwt: string = this.jwt) {
    this.http.get(`${env.baseURL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }).subscribe((data: any) => {
      this.setUser(data);
      this.setJwt(jwt);
    })
  }

  logout() {
    window.localStorage.removeItem('jwt');
    this.user = null;
    this.jwt = null;
  }
}
