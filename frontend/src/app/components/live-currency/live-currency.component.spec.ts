import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCurrencyComponent } from './live-currency.component';

describe('LiveCurrencyComponent', () => {
  let component: LiveCurrencyComponent;
  let fixture: ComponentFixture<LiveCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
