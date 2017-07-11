import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutSwitchComponent} from './layout-switch.component';
import {MdMenuModule, MdTooltipModule} from "@angular/material";

describe('LayoutSwitchComponent', () => {
  let component: LayoutSwitchComponent;
  let fixture: ComponentFixture<LayoutSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdMenuModule, MdTooltipModule],
      declarations: [LayoutSwitchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
