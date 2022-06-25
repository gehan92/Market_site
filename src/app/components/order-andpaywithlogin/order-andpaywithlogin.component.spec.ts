import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAndpaywithloginComponent } from './order-andpaywithlogin.component';

describe('OrderAndpaywithloginComponent', () => {
  let component: OrderAndpaywithloginComponent;
  let fixture: ComponentFixture<OrderAndpaywithloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAndpaywithloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAndpaywithloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
