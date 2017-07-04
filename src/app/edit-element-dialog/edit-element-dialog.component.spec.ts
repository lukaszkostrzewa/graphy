import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditElementDialogComponent} from './edit-element-dialog.component';

describe('EditElementDialogComponent', () => {
  let component: EditElementDialogComponent;
  let fixture: ComponentFixture<EditElementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditElementDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
