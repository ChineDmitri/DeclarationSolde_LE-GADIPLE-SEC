import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../models/User.model';
import { AuthAdminService } from './authAdmin.service';

@Injectable()
export class AdminService {
  usersLastWeekSubject = new Subject<User[]>();
  usersOtherWeeksSubject = new Subject<User[]>();

  usersLastWeek: User[];
  usersOtherWeeks: User[];

  constructor(private httpClient: HttpClient, public authAdminService: AuthAdminService) {}

  // getWeek(date: Date) {
  //   var onejan = new Date(date.getFullYear(), 0, 1);
  // return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  // }

  setUsersSubject() {
    this.usersLastWeekSubject.next(this.usersLastWeek.slice());
    this.usersOtherWeeksSubject.next(this.usersOtherWeeks.slice());
  }

  getAllUsers(): void {
    let dateLastWeek = new Date(Date.now() - 86400000 * 7);

    this.httpClient
      .get<any[]>('http://localhost:3000/api/admin/user/all', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.usersLastWeek = res.users.filter(
            (user: User) => new Date(user.dateDeclaration) > dateLastWeek,
          );
          this.usersOtherWeeks = res.users.filter(
            (user: User) => new Date(user.dateDeclaration) < dateLastWeek,
          );

          this.setUsersSubject();

          // console.log('adm service', this.usersLastWeek);
        },
        (err: any) => {
          console.log(err);
          this.authAdminService.admin.isAuth = err.isAuth;
          this.authAdminService.onRedirect();
        },
      );
  }
}
