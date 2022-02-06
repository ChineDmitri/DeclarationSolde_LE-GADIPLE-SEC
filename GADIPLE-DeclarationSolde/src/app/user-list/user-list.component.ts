import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AdminService } from '../service/admin.service';
import { AuthAdminService } from '../service/authAdmin.service';

import { User } from '../models/User.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  constructor(private adminService: AdminService) {}

  // LOADER
  isVisible: boolean = true;

  usersLastWeek: User[];
  usersLastWeekSubscription: Subscription;

  usersOtherWeeks: User[];
  usersOtherWeeksSubscription: Subscription;

  ngOnInit() {
    this.adminService.getAllUsers();

    this.usersLastWeekSubscription = this.adminService.usersLastWeekSubject.subscribe((users: User[]) => {
      this.usersLastWeek = users;
      this.isVisible = false; /* LOADER */
      // console.log('subscrube', this.usersLastWeek);
    });

    this.usersOtherWeeksSubscription = this.adminService.usersOtherWeeksSubject.subscribe((users: User[]) => {
      this.usersOtherWeeks = users;
      this.isVisible = false; /* LOADRED */
    });
  }

  getSub() {
    console.log(this.usersLastWeek);
  }

  ngOnDestroy() {
    this.usersLastWeekSubscription.unsubscribe();
  }
}
