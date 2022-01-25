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
  dateToday: any = new Date(Date.now());

  win: boolean = false;

  // constructor(private adminService: AdminService) { }

  // users: User[];

  // userSubscription: Subscription;

  ngOnInit(): void {
    console.log(this.dateToday);

    // let date = new Date('December 25, 1995 23:15:30');
    // let hours = date.getHours();

    // console.log(date, hours);
    // this.userSubscription = this.adminService.userSubject.subscribe(
    //   (users: any) => {
    //     this.users = users;
    //   }
    // );
    // this.adminService.emitUsers();
    // console.log('on, init', this.users);
  }

  showList(): void {
    setTimeout(() => {
      this.win = !this.win;
    });

    console.log(this.win);
  }

  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe();
  }
}
