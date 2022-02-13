import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthAdminService } from './service/authAdmin.service';

// import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'GADIPLE | Declaration';

  dateToday = new Date(Date.now());

  isAuthSubscription: Subscription;

  changePassIsVisible: boolean;

  constructor(private authAdminservice: AuthAdminService) {}

  // constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    console.log(this.authAdminservice.admin.isAuth);

    this.isAuthSubscription = this.authAdminservice.isAuth.subscribe((isAuth) => {
      this.changePassIsVisible = isAuth;
    });
    // this.adminService.getAllUsers();
    // this.dateToday.toLocaleString('de-DE');
  }

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
  }
}
