import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ZoomButtonsComponent} from "./zoom-buttons.component";
import {MdTooltipModule} from "@angular/material";

describe('ZoomButtonsComponent', () => {
  let component: ZoomButtonsComponent;
  let fixture: ComponentFixture<ZoomButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTooltipModule],
      declarations: [ZoomButtonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
