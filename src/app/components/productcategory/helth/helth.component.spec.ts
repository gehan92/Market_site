import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelthComponent } from './helth.component';

describe('HelthComponent', () => {
  let component: HelthComponent;
  let fixture: ComponentFixture<HelthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
