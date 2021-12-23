import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationSoldeComponent } from './declaration-solde.component';

describe('DeclarationSoldeComponent', () => {
  let component: DeclarationSoldeComponent;
  let fixture: ComponentFixture<DeclarationSoldeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclarationSoldeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
