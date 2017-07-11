import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ExportDialogComponent} from "./export-dialog.component";
import {FormsModule} from "@angular/forms";
import {MdDialogModule, MdDialogRef, MdSelectModule} from "@angular/material";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('ExportDialogComponent', () => {
  let component: ExportDialogComponent;
  let fixture: ComponentFixture<ExportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FormsModule, MdSelectModule, MdDialogModule],
      declarations: [ExportDialogComponent],
      providers: [{
        provide: MdDialogRef, useValue: {}
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
