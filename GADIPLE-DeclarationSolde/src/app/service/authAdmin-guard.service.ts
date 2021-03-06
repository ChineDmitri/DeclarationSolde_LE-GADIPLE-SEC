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
