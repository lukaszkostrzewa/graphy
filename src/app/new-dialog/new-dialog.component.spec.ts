import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewDialogComponent} from './new-dialog.component';
import {MdDialogModule, MdDialogRef} from "@angular/material";

describe('NewDialogComponent', () => {
  let component: NewDialogComponent;
  let fixture: ComponentFixture<NewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdDialogModule],
      declarations: [NewDialogComponent],
      providers: [{
        provide: MdDialogRef, useValue: {}
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
