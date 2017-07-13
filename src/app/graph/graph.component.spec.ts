import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphComponent} from './graph.component';
import {ZoomButtonsComponent} from '../zoom-buttons/zoom-buttons.component';
import {OptionsButtonComponent} from '../options-button/options-button.component';
import {LocateButtonComponent} from '../locate-button/locate-button.component';
import {LayoutSwitchComponent} from '../layout-switch/layout-switch.component';
import {MdDialogModule, MdMenuModule, MdSnackBarModule, MdTooltipModule} from '@angular/material';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTooltipModule, MdMenuModule, MdSnackBarModule, MdDialogModule],
      declarations: [
        GraphComponent, ZoomButtonsComponent, OptionsButtonComponent, LocateButtonComponent,
        LayoutSwitchComponent
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
