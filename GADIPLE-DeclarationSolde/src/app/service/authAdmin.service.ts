import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from '../models/Admin.model';

@Injectable()
export class AuthAdminService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  admin: Admin = {
    password: '',
    isAuth: false,
  };

  onTestAuth() {
    this.httpClient
      .get('http://localhost:3000/api/admin/all', { withCredentials: true })
      .subscribe(
        (res: any) => {
          console.log(res);

          this.admin.isAuth = res.isAuth;

          this.onRedirect();
        },
        (err: any) => {
          console.log(err);

          this.admin.isAuth = err.isAuth;

          this.onRedirect();
        }
      );
  }

  onLogIn(password: string) {
    this.admin.password = password;

    this.httpClient
      .post<Admin>('http://localhost:3000/api/admin/login', this.admin, {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);

          this.admin.isAuth = res.isAuth;

          this.onRedirect();
        },
        (err: any) => {
          console.log(err);

          this.admin.isAuth = err.isAuth;

          this.onRedirect();
        }
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
