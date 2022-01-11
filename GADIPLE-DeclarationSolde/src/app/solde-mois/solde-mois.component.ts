import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { DeclarationService } from '../service/declaration.service';

@Component({
  selector: 'app-solde-mois',
  templateUrl: './solde-mois.component.html',
  styleUrls: ['./solde-mois.component.scss'],
})
export class SoldeMoisComponent implements OnInit, OnDestroy {
  soldForm: FormGroup;
  user: User;
  userSubscription: Subscription;
  // arrDatePay: any[];

  constructor(
    private declarationService: DeclarationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.userSubscription =
      this.declarationService.declarationSubject.subscribe((user: User) => {
        this.user = user;
      });

    this.declarationService.arrayOfDate();

    // this.arrDatePay = new Array();

    // console.log(this.arrDatePay);

    /* CREATE 36 FORMS FOR SOLDE BASE & SOLDE FAMILY & IDEMNITY RESIDENTIAL*/
    for (let i = 0; i < 37; i++) {
      let newSb = this.formBuilder.control(0, Validators.required);
      let newSf = this.formBuilder.control(0, Validators.required);
      let newIr = this.formBuilder.control(0, Validators.required);

      this.getSoldBase().push(newSb);
      this.getSoldFamily().push(newSf);
      this.getIndemnityResidential().push(newIr);
    }
  }

  getSoldBase(): FormArray {
    return this.soldForm.get('sb') as FormArray;
  }

  getSoldFamily(): FormArray {
    return this.soldForm.get('sf') as FormArray;
  }

  getIndemnityResidential(): FormArray {
    return this.soldForm.get('ir') as FormArray;
  }

  initForm(): void {
    this.soldForm = this.formBuilder.group({
      sb: this.formBuilder.array([]),
      sf: this.formBuilder.array([]),
      ir: this.formBuilder.array([]),
      cb: [false, Validators.requiredTrue],
    });
  }

  onSubmitSolde(): void {
    // console.log(arraySoldeOfMonth)
    this.declarationService.saveUserToServer(this.soldForm.value);

    // this.declarationService

    console.log('solde-mois ', this.user);
  }

  ngOnDestroy(): void {
    this.user.start = false;

    this.userSubscription.unsubscribe();
  }
}
