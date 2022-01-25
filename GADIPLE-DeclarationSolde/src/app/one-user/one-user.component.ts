import { Component, OnInit } from '@angular/core';

// import { DeclarationService } from '../service/declaration.service';
// import { AdminService } from '../service/admin.service';

import { User } from '../models/User.model';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.scss'],
})
export class OneUserComponent implements OnInit {
  // user: User;
  user: User;

  constructor(
    // private declarationService: DeclarationService,
    // private adminService: AdminService
  ) {}

  ngOnInit(): void {
    // this.adminService.getOneUser();

    // this.user = this.adminService.user;

  }
}
