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

  // TRUE if loading in progress; FALSE if response from server finished;
  isLoading = new BehaviorSubject(false);

  // onLoading(): Observable<boolean> {
  //   return this.loading;
  // }

  getIsLoading(): Observable<boolean> {
    return this.isLoading;
  }

  setIsLoading(state: boolean): void {
    // console.log('onLoading', state);
    this.isLoading.next(state);
  }

  onHendlerAuth() {
    this.setIsLoading(true);

    this.httpClient.get('http://localhost:3000/api/admin/isAuth', { withCredentials: true }).subscribe(
      (res: any) => {
        this.admin.isAuth = res.isAuth;

        this.setIsLoading(false);

        this.onRedirect();
      },
      (err: any) => {
        this.admin.isAuth = err.isAuth;

        this.setIsLoading(false);

        console.log('wtf?!');

        this.onRedirect();
      },
    );
  }

  onLogIn(password: string) {
    this.setIsLoading(true);

    this.admin.password = password;
    this.httpClient
      .post<Admin>('http://localhost:3000/api/admin/login', { password }, { withCredentials: true })
      .subscribe(
        (res: any) => {
          // console.log(res);

          this.setIsLoading(false);

          this.admin.isAuth = res.isAuth;

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

  onRedirect(): void {
    if (this.admin.isAuth) {
      this.router.navigate(['/admin/allusers']);
    } else {
      this.router.navigate(['/admin']);
    }
  }
}
