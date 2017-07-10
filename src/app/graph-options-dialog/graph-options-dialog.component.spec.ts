import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphOptionsDialogComponent} from './graph-options-dialog.component';

describe('GraphOptionsDialogComponent', () => {
  let component: GraphOptionsDialogComponent;
  let fixture: ComponentFixture<GraphOptionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphOptionsDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
