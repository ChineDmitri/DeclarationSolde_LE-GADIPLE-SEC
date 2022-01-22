import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// import { AdminService } from '../service/admin.service';

// import { User } from '../models/User.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  // constructor(private adminService: AdminService) { }

  // users: User[];

  // userSubscription: Subscription;

  ngOnInit(): void {
    // this.userSubscription = this.adminService.userSubject.subscribe(
    //   (users: any) => {
    //     this.users = users;
    //   }
    // );

    // this.adminService.emitUsers();

    // console.log('on, init', this.users);
  }

  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe();
  }
}
