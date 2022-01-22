import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../models/User.model';

@Injectable()
export class DeclarationService {
  declarationSubject = new Subject<User>();

  private user: User = {
    start: false,
    nom: '',
    dateFDC_str: '',
    dateFDC_utc: '',
    MonthPay: new Array(),
    MonthSolde: new Array(),
  };

  test() {
    console.log(this.user);
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  emitDeclaration() {
    this.declarationSubject.next(this.user);
  }

  strDateParse(strDate: string): Date {
    const year = strDate.slice(0, 4);
    const day = strDate.slice(8, 10);
    const month =
      Number(day) >= 24 ? parseInt(strDate.slice(5, 7)) : parseInt(strDate.slice(5, 7)) - 1;

    return new Date(Number(year), month - 1, Number(day));
  }

  /* Create array date 36 mount */
  arrayOfDate(): void {
    for (let i = 0; i < 37; i++) {
      // initialize date FDC
      const copyDateFDC_utc = new Date(this.user.dateFDC_utc.getTime());
      // decriment month
      copyDateFDC_utc.setMonth(copyDateFDC_utc.getMonth() - i);

      // console.log(copyDateFDC_utc);

      this.user.MonthPay.push(copyDateFDC_utc);
    }

    this.emitDeclaration();
  }

  addBio(newUser: User) {
    this.user = newUser;

    this.emitDeclaration();
  }

  saveUserToServer(formValue: any): void {
    for (let i = 0; i < 37; i++) {
      this.user.MonthSolde.push(formValue.sb[i] + formValue.sf[i] + formValue.ir[i]);
    }

    this.emitDeclaration();

    this.httpClient.post<User>('http://localhost:3000/api/user/create', this.user).subscribe(
      (res) => {
        console.log(res, 'OK!');

        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
