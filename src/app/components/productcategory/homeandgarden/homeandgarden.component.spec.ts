import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeandgardenComponent } from './homeandgarden.component';

describe('HomeandgardenComponent', () => {
  let component: HomeandgardenComponent;
  let fixture: ComponentFixture<HomeandgardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeandgardenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeandgardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
