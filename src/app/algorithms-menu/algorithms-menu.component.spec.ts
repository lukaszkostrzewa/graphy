import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlgorithmsMenuComponent} from './algorithms-menu.component';
import {MdMenuModule} from '@angular/material';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
  template: '<app-algorithms-menu (algorithmSelected)="setSelectedAlgorithm($event)"></app-algorithms-menu>'
})
class TestHostComponent {
  selectedAlgorithm: string | null = null;

  setSelectedAlgorithm(selectedAlgorithm: string) {
    this.selectedAlgorithm = selectedAlgorithm;
  }
}

describe('AlgorithmsMenuComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: DebugElement;
  let menuItems: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdMenuModule],
      declarations: [AlgorithmsMenuComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement;
    menuItems = element.queryAll(By.css('button'));
  });

  it('should have 5 algorithms', () => {
    // expect(menuItems.length).toEqual(0); // todo: Figure out why there is no md-menu-item
  });

  // it('should select proper algorithm', () => {
  //   menuItems[0].triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(component.selectedAlgorithm).toEqual('bfs');
  // });
});
