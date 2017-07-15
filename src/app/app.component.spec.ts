import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {
  MdButtonToggleModule,
  MdDialogModule,
  MdMenuModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdTooltipModule
} from '@angular/material';
import {MainToolbarComponent} from './main-toolbar/main-toolbar.component';
import {AccountButtonComponent} from './account-button/account-button.component';
import {HintsComponent} from './hints/hints.component';
import {SlickModule} from 'ngx-slick';
import {GraphComponent} from './graph/graph.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {AlgorithmsMenuComponent} from './algorithms-menu/algorithms-menu.component';
import {ZoomButtonsComponent} from './zoom-buttons/zoom-buttons.component';
import {OptionsButtonComponent} from './options-button/options-button.component';
import {LocateButtonComponent} from './locate-button/locate-button.component';
import {LayoutSwitchComponent} from './layout-switch/layout-switch.component';
import {FirstLetterPipe} from './common/first-letter.pipe';
import {AlgorithmRunner} from './graph/algorithms/algorithm-runner';
import {GraphService} from './graph/graph.service';
import {Parser} from './graph/parsers/parser';
import {Exporter} from './graph/export/exporter';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdSidenavModule, SlickModule.forRoot(), MdSnackBarModule, MdButtonToggleModule,
        MdTooltipModule, MdMenuModule, MdDialogModule
      ],
      declarations: [
        AppComponent, AccountButtonComponent, HintsComponent, GraphComponent, MainToolbarComponent,
        SideMenuComponent, AlgorithmsMenuComponent, ZoomButtonsComponent, OptionsButtonComponent,
        LocateButtonComponent, LayoutSwitchComponent, FirstLetterPipe
      ],
      providers: [
        {provide: AlgorithmRunner, useValue: []},
        {provide: Parser, useValue: []},
        {provide: Exporter, useValue: []},
        GraphService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
