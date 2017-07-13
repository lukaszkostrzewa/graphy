import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LocateButtonComponent} from './locate-button.component';
import {MdTooltipModule} from '@angular/material';

describe('LocateButtonComponent', () => {
  let component: LocateButtonComponent;
  let fixture: ComponentFixture<LocateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTooltipModule],
      declarations: [LocateButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
