import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

    this.declarationService.emitDeclaration();

    // this.arrDatePay = new Array();

    // console.log(this.arrDatePay);
  }

  initForm(): void {
    this.soldForm = this.formBuilder.group({
      // nom: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      sb0: [0, [Validators.required]],
      sf0: [0, [Validators.required]],
      ir0: [0, [Validators.required]],
      sf1: [0, [Validators.required]],
      ir1: [0, [Validators.required]],
      sb2: [0, [Validators.required]],
      sf2: [0, [Validators.required]],
      ir2: [0, [Validators.required]],
      sb1: [0, [Validators.required]],
      sb3: [0, [Validators.required]],
      sf3: [0, [Validators.required]],
      ir3: [0, [Validators.required]],
      sb4: [0, [Validators.required]],
      sf4: [0, [Validators.required]],
      ir4: [0, [Validators.required]],
      sb5: [0, [Validators.required]],
      sf5: [0, [Validators.required]],
      ir5: [0, [Validators.required]],
      // sb6: ['', [Validators.required]],
      // sf6: ['', [Validators.required]],
      // ir6: ['', [Validators.required]],
    });
  }

  onSubmitSolde(): void {
    const formValue = this.soldForm.value;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
