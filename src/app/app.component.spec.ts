import {async, TestBed} from "@angular/core/testing";

import {AppComponent} from "./app.component";
import {MdSidenavModule, MdSnackBarModule} from "@angular/material";
import {MainToolbarComponent} from "./main-toolbar/main-toolbar.component";
import {AccountButtonComponent} from "./account-button/account-button.component";
import {HintsComponent} from "./hints/hints.component";
import {SlickModule} from "ngx-slick";
import {HotkeyModule} from "angular2-hotkeys";
import {GraphComponent} from "./graph/graph.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdSidenavModule, SlickModule.forRoot(), HotkeyModule.forRoot(), MdSnackBarModule],
      declarations: [
        AppComponent, MainToolbarComponent, AccountButtonComponent, HintsComponent, GraphComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
