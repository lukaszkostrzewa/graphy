import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditEdgeDialogComponent} from './edit-edge-dialog.component';

describe('EditEdgeDialogComponent', () => {
  let component: EditEdgeDialogComponent;
  let fixture: ComponentFixture<EditEdgeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditEdgeDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEdgeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
