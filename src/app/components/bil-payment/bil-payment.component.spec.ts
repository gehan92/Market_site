import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilPaymentComponent } from './bil-payment.component';

describe('BilPaymentComponent', () => {
  let component: BilPaymentComponent;
  let fixture: ComponentFixture<BilPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
