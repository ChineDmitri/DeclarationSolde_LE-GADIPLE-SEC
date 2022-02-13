import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { User } from '../models/User.model';
import { AuthAdminService } from './authAdmin.service';

@Injectable()
export class AdminService {
  // Subject of users declared last 7 days and other users
  usersLastWeekSubject = new Subject<User[]>();
  usersOtherWeeksSubject = new Subject<User[]>();

  usersLastWeek: User[];
  usersOtherWeeks: User[];

  allUsers: User[]; // all user for using in the user.components

  stateModalDelete = new BehaviorSubject(false); // state of the modal windows for delete user

  constructor(private httpClient: HttpClient, public authAdminService: AuthAdminService) {}

  // Setter for all users (users declared last week and other users)
  setUsersSubject() {
    this.usersLastWeekSubject.next(this.usersLastWeek.slice());
    this.usersOtherWeeksSubject.next(this.usersOtherWeeks.slice());
  }

  // set state wondows modal for delete
  setModalDelete(state: boolean): void {
    this.stateModalDelete.next(!state);
  }

  deleteOneUser(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/admin/user/${id}`, { withCredentials: true }).subscribe(
      (res: any) => {
        console.log(res);
        this.authAdminService.onRedirect();
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getAllUsers(): void {
    let dateLastWeek = new Date(Date.now() - 86400000 * 7);

    this.httpClient
      .get<any[]>('http://localhost:3000/api/admin/user/all', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.allUsers = res.users;

          // filtre for users last 7 day or other
          this.usersLastWeek = this.allUsers.filter(
            (user: User) => new Date(user.dateDeclaration) > dateLastWeek,
          );
          this.usersOtherWeeks = res.users.filter(
            (user: User) => new Date(user.dateDeclaration) < dateLastWeek,
          );

          // Reverse users array for descending view
          this.usersLastWeek.reverse();
          this.usersOtherWeeks.reverse();

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

  changePasswordAdmin(password: string): void {
    this.httpClient
      .post('http://localhost:3000/api/admin/modificationPassword', { password }, { withCredentials: true })
      .subscribe(
        (res: any) => {
          console.log('password changé');

          this.authAdminService.onRedirect()
        },
        (err: any) => {
          console.log(err);
        },
      );
  }
}
