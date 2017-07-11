import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphOptionsDialogComponent} from './graph-options-dialog.component';
import {
  MD_DIALOG_DATA, MdCheckboxModule, MdDialogModule, MdDialogRef,
  MdInputModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('GraphOptionsDialogComponent', () => {
  let component: GraphOptionsDialogComponent;
  let fixture: ComponentFixture<GraphOptionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FormsModule, MdInputModule, MdCheckboxModule, MdDialogModule],
      declarations: [GraphOptionsDialogComponent],
      providers: [{
        provide: MD_DIALOG_DATA, useValue: {directedGraph: false}
      }, {
        provide: MdDialogRef, useValue: {}
      }]
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
