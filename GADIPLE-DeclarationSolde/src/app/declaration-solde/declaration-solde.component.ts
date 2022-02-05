import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DeclarationService } from '../service/declaration.service';

import { User } from '../models/User.model';

@Component({
  selector: 'app-declaration-solde',
  templateUrl: './declaration-solde.component.html',
  styleUrls: ['./declaration-solde.component.scss'],
})
export class DeclarationSoldeComponent implements OnInit, OnDestroy {
  userForm: FormGroup;

  userSubscription: Subscription;

  user: User;

  constructor(private formBuilder: FormBuilder, private declarationService: DeclarationService) {}

  ngOnInit(): void {
    this.initForm();

    this.userSubscription = this.declarationService.declarationSubject.subscribe((user: User) => {
      this.user = user;
    });

    this.declarationService.emitDeclaration();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      // nom: [''],
      nom: ['', [Validators.required, Validators.pattern(/^[A-Z]+$/i)]],
      dateFDC: ['', [Validators.required]],
    });
  }


  onSubmitBio() {
    const formValue = this.userForm.value;

    const newUser = new User(
      '',
      Date.now(),
      true,
      formValue['nom'],
      formValue['dateFDC'],
      this.declarationService.strDateParse(formValue['dateFDC']),
      [],
    );

    this.declarationService.addBio(newUser);
  }

  ngOnDestroy(): void {
    this.declarationService.initBio();
    this.userSubscription.unsubscribe();
  }
}
