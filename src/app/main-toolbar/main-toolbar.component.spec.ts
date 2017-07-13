import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainToolbarComponent} from './main-toolbar.component';
import {MdMenuModule, MdToolbarModule, MdTooltipModule} from '@angular/material';
import {AlgorithmsMenuComponent} from '../algorithms-menu/algorithms-menu.component';

describe('MainToolbarComponent', () => {
  let component: MainToolbarComponent;
  let fixture: ComponentFixture<MainToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdToolbarModule, MdTooltipModule, MdMenuModule],
      declarations: [MainToolbarComponent, AlgorithmsMenuComponent]
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
