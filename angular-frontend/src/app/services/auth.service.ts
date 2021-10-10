import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import { LoggedInUser, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AuthURL = environment.authUrl + 'auth';
  constructor(
    private readonly _http: HttpClient,
    private readonly router: Router
  ) {}

  user = new BehaviorSubject<LoggedInUser | null>(null);
  private expirySub: any;
  refreshSub: any;

  register(user: User) {
    return this._http.post(`${this.AuthURL}/register`, user);
  }

  RefreshToken() {
    return this._http
      .post(`${this.AuthURL}/refresh-token`, {}, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          const decoded = jwt_decode<{ exp: number; iss: string; iat: number }>(
            res.jwtToken
          );
          const expiry = new Date(decoded.exp * 1000);
          const expiresIn = expiry.getTime() - new Date().getTime();
          this.startRefreshTokenTimer(expiresIn);
        })
      );
  }

  login(user: User) {
    return this._http
      .post(`${this.AuthURL}/login`, user, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          this.Authenticate(res.jwtToken, res.username, res._id);
        })
      );
  }
  autoLogin() {
    const userData: {
      username: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData.username) {
      return;
    }
    this.Authenticate(userData._token, userData.username, userData.id);
  }

  Authenticate(token: string, username: string, _id: string) {
    const decoded =
      jwt_decode<{ exp: number; iss: string; iat: number }>(token);
    const expiry = new Date(decoded.exp * 1000);
    const expiresIn = expiry.getTime() - new Date().getTime();
    const user = new LoggedInUser(username, _id, token, expiry);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.startRefreshTokenTimer(expiresIn);
  }

  startRefreshTokenTimer(expiresIn: number) {
    //refreshTimer to get new token 1 min (60 * 1000 miliseconds) before expiry
    const refreshTimer = expiresIn - 110 * 1000;
    this.refreshSub = setTimeout(() => {
      this.RefreshToken().subscribe();
    }, refreshTimer);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('userData');
    if (this.expirySub) {
      clearTimeout(this.expirySub);
    }
    this.expirySub = null;
  }
}
