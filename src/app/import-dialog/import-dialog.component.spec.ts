import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportDialogComponent} from './import-dialog.component';
import {MdDialogRef, MdSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Parser} from '../graph/parsers/parser';
import {GraphService} from '../graph/graph.service';

describe('ImportDialogComponent', () => {
  let component: ImportDialogComponent;
  let fixture: ComponentFixture<ImportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FormsModule, MdSelectModule],
      declarations: [ImportDialogComponent, FileUploadComponent],
      providers: [
        GraphService,
        {provide: MdDialogRef, useValue: {}},
        {provide: Parser, useValue: []}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
