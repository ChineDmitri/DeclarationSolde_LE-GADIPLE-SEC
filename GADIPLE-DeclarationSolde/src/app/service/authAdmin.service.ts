/* AUTH SERVICE FOR ADMINISTATOR */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Admin } from '../models/Admin.model';

@Injectable()
export class AuthAdminService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  admin: Admin = {
    password: '',
    isAuth: false,
  };

  //auth or non
  isAuth = new BehaviorSubject(false);

  // TRUE if loading in progress; FALSE if response from server finished;
  isLoading = new BehaviorSubject(false);

  // getter the state of a isLoading
  getIsLoading(): Observable<boolean> {
    return this.isLoading;
  }

  // setter the state to isLoading
  setIsLoading(state: boolean): void {
    this.isLoading.next(state);

    // state isAuth for menu
    this.isAuth.next(this.admin.isAuth);
  }

  // Verification a cookies for authentication in AdminPanel
  onHendlerAuth() {
    // console.log(this.admin);

    // start loading
    this.setIsLoading(true);

    // if admin is auth: No Chec Cookies (HttpOnly) ELSE
    // else we will execute a redirection
    if (!this.admin.isAuth) {
      this.httpClient.get('https://gadiple.herokuapp.com/api/admin/isAuth', { withCredentials: true }).subscribe(
        (res: any) => {
          this.admin.isAuth = res.isAuth;

          this.setIsLoading(false);

          this.onRedirect();
        },
        (err: any) => {
          this.admin.isAuth = err.isAuth;

          this.setIsLoading(false);

          this.onRedirect();
        },
      );
    } else {
      this.onRedirect();
    }
  }

  // Authenticate as administrator
  onLogIn(password: string) {
    this.setIsLoading(true);

    this.admin.password = password;
    this.httpClient
      .post<Admin>('https://gadiple.herokuapp.com/api/admin/login', { password }, { withCredentials: true })
      .subscribe(
        (res: any) => {
          // console.log(res);

          this.admin.isAuth = res.isAuth;

          this.setIsLoading(false);

          this.onRedirect();
        },
        (err: any) => {
          // console.log(err);

          this.setIsLoading(false);

          this.admin.isAuth = err.isAuth;

          this.onRedirect();
        },
      );
  }

  // Redirection in AllUsers if auth ok!
  onRedirect(): void {
    if (this.admin.isAuth) {
      this.router.navigate(['/admin/allusers']);
    } else {
      this.router.navigate(['/admin']);
    }
  }
}
