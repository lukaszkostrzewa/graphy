import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SideMenuComponent} from './side-menu.component';
import {MdDialogModule, MdIconModule, MdMenuModule} from '@angular/material';
import {AlgorithmsMenuComponent} from '../algorithms-menu/algorithms-menu.component';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdIconModule, MdMenuModule, MdDialogModule],
      declarations: [SideMenuComponent, AlgorithmsMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
