import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {EditNodeDialogComponent} from "./edit-node-dialog.component";
import {
  MD_DIALOG_DATA,
  MdButtonToggleModule,
  MdDialogModule, MdDialogRef,
  MdInputModule,
  MdSelectModule,
  MdSliderModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('EditNodeDialogComponent', () => {
  let component: EditNodeDialogComponent;
  let fixture: ComponentFixture<EditNodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule, MdInputModule, FormsModule, MdSelectModule, MdSliderModule,
        MdButtonToggleModule, MdDialogModule
      ],
      declarations: [EditNodeDialogComponent],
      providers: [{
        provide: MD_DIALOG_DATA, useValue: {
          element: {
            id: () => 1,
            data: () => {
            },
            css: () => {
            },
            numericStyle: () => {
            },
            addClass: () => {
            },
            removeClass: () => {
            },
            parent: () => {
              return {id: () => 1}
            }
          }
        }
      }, {
        provide: MdDialogRef, useValue: {}
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
