import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';

export class DeclarationService {
  private user: User = {
    start: false,
    nom: '',
    dateFDC_str: '',
    dateFDC_utc: '',
    MonthPay: new Array(),
    MontSolde: new Array(),
  };

  declarationSubject = new Subject<User>();

  emitDeclaration() {
    this.declarationSubject.next(this.user);
  }

  exo: Date;

  strDateParse(strDate: string): Date {
    let year = strDate.slice(0, 4);
    let day = strDate.slice(8, 10);
    let month = Number(day) >= 24 ? parseInt(strDate.slice(5, 7)) : parseInt(strDate.slice(5, 7)) - 1;

    return new Date(Number(year), month - 1, Number(day));
  }

  arrayOfDate(): void {
    for (let i = 0; i <= 5; i++) {
      // initialize date FDC
      let copyDateFDC_utc = new Date(this.user.dateFDC_utc.getTime());
      // decriment month
      copyDateFDC_utc.setMonth(copyDateFDC_utc.getMonth() - i);

      // console.log(copyDateFDC_utc);

      this.user.MonthPay.push(copyDateFDC_utc);
    }
  }

  addBio(newUser: User) {
    this.user = newUser;

    this.emitDeclaration();
  }
}
