import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MainToolbarComponent} from "./main-toolbar.component";
import {MdToolbarModule} from "@angular/material";

describe('MainToolbarComponent', () => {
  let component: MainToolbarComponent;
  let fixture: ComponentFixture<MainToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdToolbarModule],
      declarations: [MainToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
