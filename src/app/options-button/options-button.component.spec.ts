import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {OptionsButtonComponent} from "./options-button.component";
import {MdDialogModule, MdTooltipModule} from "@angular/material";

describe('OptionsButtonComponent', () => {
  let component: OptionsButtonComponent;
  let fixture: ComponentFixture<OptionsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdDialogModule, MdTooltipModule],
      declarations: [OptionsButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
