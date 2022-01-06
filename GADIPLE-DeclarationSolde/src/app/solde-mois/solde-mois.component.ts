import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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

    this.declarationService.emitDeclaration();

    // this.arrDatePay = new Array();

    // console.log(this.arrDatePay);

    /* CREATE 36 FORMS FOR SOLDE BASE & SOLDE FAMILY & IDEMNITY RESIDENTIAL*/
    for (let i = 0; i < 37; i++) {
      let newSb = this.formBuilder.control('' /* Validators.required */);
      let newSf = this.formBuilder.control('');
      let newIr = this.formBuilder.control('');

      this.getSoldBase().push(newSb);
      this.getSoldFamily().push(newSf);
      this.getIndemnityResidential().push(newIr);
    }
  }

  getSoldBase() {
    return this.soldForm.get('sb') as FormArray;
  }

  getSoldFamily() {
    return this.soldForm.get('sf') as FormArray;
  }

  getIndemnityResidential() {
    return this.soldForm.get('ir') as FormArray;
  }

  initForm(): void {
    this.soldForm = this.formBuilder.group({
      sb: this.formBuilder.array([]),
      sf: this.formBuilder.array([]),
      ir: this.formBuilder.array([]),
    });

    // for (let i = 0; i < 37; i++) {
    //   let arrSb, arrSf, arrIr: Number[]

    //   this.soldForm = this.formBuilder.group({
    //     sb: [arrSb[i].push(0), [Validators.required]],
    //     sf: [0, [Validators.required]],
    //     if: [0, [Validators.required]],
    //   });
    // }
  }
  //   this.soldForm = this.formBuilder.group({
  //     // nom: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
  //     sb0: [0, [Validators.required]],
  //     sf0: [0, [Validators.required]],
  //     ir0: [0, [Validators.required]],

  //     // sb1: [0, [Validators.required]],
  //     // sf1: [0, [Validators.required]],
  //     // ir1: [0, [Validators.required]],

  //     // sb2: [0, [Validators.required]],
  //     // sf2: [0, [Validators.required]],
  //     // ir2: [0, [Validators.required]],

  //     // sb3: [0, [Validators.required]],
  //     // sf3: [0, [Validators.required]],
  //     // ir3: [0, [Validators.required]],

  //     // sb4: [0, [Validators.required]],
  //     // sf4: [0, [Validators.required]],
  //     // ir4: [0, [Validators.required]],

  //     // sb5: [0, [Validators.required]],
  //     // sf5: [0, [Validators.required]],
  //     // ir5: [0, [Validators.required]],

  //     // sb6: [0, [Validators.required]],
  //     // sf6: [0, [Validators.required]],
  //     // ir6: [0, [Validators.required]],

  //     // sb7: [0, [Validators.required]],
  //     // sf7: [0, [Validators.required]],
  //     // ir7: [0, [Validators.required]],
  //     // sb6: ['', [Validators.required]],
  //     // sf6: ['', [Validators.required]],
  //     // ir6: ['', [Validators.required]],
  //   });
  // }

  onSubmitSolde(): void {
    const formValue = this.soldForm.value;

    console.log(formValue);
    console.log(this.user)
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
