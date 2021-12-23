import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldeMoisComponent } from './solde-mois.component';

describe('SoldeMoisComponent', () => {
  let component: SoldeMoisComponent;
  let fixture: ComponentFixture<SoldeMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldeMoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldeMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
