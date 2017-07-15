import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphComponent} from './graph.component';
import {ZoomButtonsComponent} from '../zoom-buttons/zoom-buttons.component';
import {OptionsButtonComponent} from '../options-button/options-button.component';
import {LocateButtonComponent} from '../locate-button/locate-button.component';
import {LayoutSwitchComponent} from '../layout-switch/layout-switch.component';
import {MdDialogModule, MdMenuModule, MdSnackBarModule, MdTooltipModule} from '@angular/material';
import {AlgorithmRunner} from './algorithms/algorithm-runner';
import {GraphService} from './graph.service';
import {Parser} from './parsers/parser';
import {Exporter} from './export/exporter';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTooltipModule, MdMenuModule, MdSnackBarModule, MdDialogModule],
      declarations: [
        GraphComponent, ZoomButtonsComponent, OptionsButtonComponent, LocateButtonComponent,
        LayoutSwitchComponent
      ],
      providers: [
        GraphService,
        {provide: AlgorithmRunner, useValue: []},
        {provide: Parser, useValue: []},
        {provide: Exporter, useValue: []},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
