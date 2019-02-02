import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRestComponent } from './request-rest.component';

describe('RequestRestComponent', () => {
  let component: RequestRestComponent;
  let fixture: ComponentFixture<RequestRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
