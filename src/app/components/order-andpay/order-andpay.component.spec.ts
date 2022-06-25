import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAndpayComponent } from './order-andpay.component';

describe('OrderAndpayComponent', () => {
  let component: OrderAndpayComponent;
  let fixture: ComponentFixture<OrderAndpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAndpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAndpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
