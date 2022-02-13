/* SERVICE FOR DECLARATION PAY AND HELPER FOR THIS DECLARATION */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../models/User.model';

@Injectable()
export class DeclarationService {
  declarationSubject = new Subject<User>();
  MonthPaySubject = new Subject<any[]>();

  // Object user for server - model User
  private user: User = {
    _id: '',
    dateDeclaration: Date.now(),
    start: false,
    nom: '',
    dateFDC_str: '',
    dateFDC_utc: '',
    MonthSolde: new Array(),
  };


  MonthPay: Array<any> = [];

  constructor(private httpClient: HttpClient, private router: Router) {}

  //Setter
  emitDeclaration() {
    this.declarationSubject.next(this.user);
  }

  setMonthPay() {
    this.MonthPaySubject.next(this.MonthPay.slice());
  }

  // Str from HTML tranform en Date
  strDateParse(strDate: string): Date {
    const year = strDate.slice(0, 4);
    const day = strDate.slice(8, 10);
    const month = Number(day) >= 24 ? parseInt(strDate.slice(5, 7)) : parseInt(strDate.slice(5, 7)) - 1;

    return new Date(Number(year), month - 1, Number(day));
  }

  /* Create array date 36 mount */
  arrayOfDate(): void {
    for (let i = 0; i < 37; i++) {
      // initialize date FDC
      const copyDateFDC_utc = new Date(this.user.dateFDC_utc.getTime());
      // decriment month
      copyDateFDC_utc.setMonth(copyDateFDC_utc.getMonth() - i);
      //creation array of motnhs pay
      this.MonthPay.push(copyDateFDC_utc);
    }

    this.setMonthPay();
  }

  // To add bio
  addBio(newUser: User) {
    this.user = newUser;

    this.emitDeclaration();
  }

  // Initialize bio if user quitted declaration
  initBio() {
    this.user = new User('', '', false, '', '', '', []);
    this.MonthPay = [];

    this.emitDeclaration();
    this.setMonthPay();
  }

  // Send user in server ans save with API
  saveUserToServer(formValue: any): void {
    // Count total for each month
    for (let i = 0; i < 37; i++) {
      this.user.MonthSolde.push(formValue.sb[i] + formValue.sf[i] + formValue.ir[i]);
    }

    console.log(this.user);

    this.httpClient.post<User>('https://gadiple.herokuapp.com/api/user/create', this.user).subscribe(
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
