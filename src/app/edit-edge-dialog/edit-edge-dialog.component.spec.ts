import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {EditEdgeDialogComponent} from "./edit-edge-dialog.component";
import {
  MD_DIALOG_DATA,
  MdButtonToggleModule,
  MdDialogModule,
  MdDialogRef,
  MdInputModule,
  MdSliderModule,
  MdTooltipModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('EditEdgeDialogComponent', () => {
  let component: EditEdgeDialogComponent;
  let fixture: ComponentFixture<EditEdgeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule, FormsModule, MdInputModule, MdSliderModule, MdButtonToggleModule,
        MdTooltipModule, MdDialogModule
      ],
      declarations: [EditEdgeDialogComponent],
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
    fixture = TestBed.createComponent(EditEdgeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
