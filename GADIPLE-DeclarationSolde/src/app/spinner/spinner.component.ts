import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthAdminService } from '../service/authAdmin.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  isLoad: boolean = true;
  isLoadSubscription: Subscription;

  constructor(private adminAuthService: AuthAdminService) {
    this.isLoadSubscription = this.adminAuthService.getIsLoading().subscribe((log) => {
      this.isLoad = log;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.isLoadSubscription.unsubscribe();
  }
}
