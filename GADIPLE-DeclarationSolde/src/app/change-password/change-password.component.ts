import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      passwordOne: [''],
      passwordTwo: [''],
    });
  }

  onSubmitChangePasswordGroup(): void {
    this.adminService.changePasswordAdmin(this.changePasswordForm.value.passwordOne);
  }
}
