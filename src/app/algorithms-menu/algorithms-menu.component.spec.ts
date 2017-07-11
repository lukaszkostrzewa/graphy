import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlgorithmsMenuComponent} from './algorithms-menu.component';
import {MdMenuModule} from "@angular/material";

describe('AlgorithmsMenuComponent', () => {
  let component: AlgorithmsMenuComponent;
  let fixture: ComponentFixture<AlgorithmsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdMenuModule],
      declarations: [AlgorithmsMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
