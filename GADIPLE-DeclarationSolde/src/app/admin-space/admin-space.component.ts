import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { AdminService } from '../service/admin.service';
import { AuthAdminService } from '../service/authAdmin.service';
import { AdminService } from '../service/admin.service';

import { Admin } from '../models/Admin.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.scss'],
})
export class AdminSpaceComponent implements OnInit, OnDestroy {
  adminForm: FormGroup;
  admin: Admin;

  // LOADER
  isVisible: boolean = true;
  isLoadingSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authAdminService: AuthAdminService) {}

  ngOnInit(): void {
    this.initForm();

    this.isLoadingSubscription = this.authAdminService.getIsLoading().subscribe((log) => {
      this.isVisible = !log; /* REVERSE */
      // console.log('log', log)
    });

    this.authAdminService.onHendlerAuth();

    // console.log("Admin ", Admin);
  }

  initForm(): void {
    this.adminForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  onSubmitAdminForm(): void {
    this.authAdminService.onLogIn(this.adminForm.value.password);
  }

  ngOnDestroy(): void {
    // this.isLoadingSubscription.unsubscribe();
  }
}
