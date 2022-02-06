import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AdminService } from '../service/admin.service';

import { User } from '../models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private adminService: AdminService) {}

  id: string = this.route.snapshot.params['id']; // id from params

  user: User | undefined;
  monthPay: Array<any> = [];

  dateTest: any = Date.now();

  isVisibleModalDelete: boolean = false;
  modalDelete: Subscription; // subscription en state windows delete

  ngOnInit(): void {
    this.user = this.adminService.allUsers.find((user) => user._id === this.id); // search in array all users

    // create 36 month since month FDC
    for (let i = 0; i < 37; i++) {
      let copyDateFDC_utc = new Date(this.user?.dateFDC_utc); // initialize date FDC

      copyDateFDC_utc.setMonth(copyDateFDC_utc.getMonth() - i); // decriment month

      this.monthPay.push(copyDateFDC_utc); //creation array of motnhs pay
    }

    this.modalDelete = this.adminService.stateModalDelete.subscribe((state) => {
      this.isVisibleModalDelete = state;
    });
  }

  onDelete(): void {
    this.adminService.setModalDelete(this.isVisibleModalDelete);
  }

  ngOnDestroy(): void {
    this.modalDelete.unsubscribe()
  }
}
