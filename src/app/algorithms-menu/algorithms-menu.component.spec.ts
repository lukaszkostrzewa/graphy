import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlgorithmsMenuComponent} from './algorithms-menu.component';

describe('AlgorithmsMenuComponent', () => {
  let component: AlgorithmsMenuComponent;
  let fixture: ComponentFixture<AlgorithmsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
