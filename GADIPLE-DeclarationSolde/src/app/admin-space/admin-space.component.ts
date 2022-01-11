import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthAdminService } from '../service/authAdmin.service';

import { Admin } from '../models/Admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.scss'],
})
export class AdminSpaceComponent implements OnInit {
  adminForm: FormGroup;
  admin: Admin;

  constructor(
    private formBuilder: FormBuilder,
    private authAdminservice: AuthAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.authAdminservice.onTestAuth();

    this.authAdminservice.onRedirect();
  }

  initForm(): void {
    this.adminForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  onSubmitAdminForm(): void {
    this.authAdminservice.onLogIn(this.adminForm.value.password);
  }
}
