import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthAdminService } from './authAdmin.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private adminAuthService: AuthAdminService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.adminAuthService.admin.isAuth) {
      return true;
    } else {
      this.router.navigate(['/admin']);

      return false;
    }
  }
}

/* SPINNER */

// import { Observable, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-spinner',
//   templateUrl: '../spinner/spinner.component.html',
//   styleUrls: ['../spinner/spinner.component.scss'],
// })
// export class SpinnerComponent implements OnInit, OnDestroy {
//   isLoad: boolean = true;
//   isLoadSubscription: Subscription;

//   constructor(private adminAuthService: AuthAdminService) {
//     this.isLoadSubscription = this.adminAuthService.getIsLoading().subscribe((log: boolean) => {
//       this.isLoad = log;
//       console.log('spinner', this.isLoad);
//     });
//   }

//   ngOnInit(): void {

//     // this.adminAuthService.getIsLoading().subscribe((log) => {
//     //   console.log(log);
//     //   this.isLoad = log;
//     // });

//     // console.log('service load', this.isLoad);
//   }

//   ngOnDestroy(): void {
//     this.isLoadSubscription.unsubscribe();
//   }
// }
