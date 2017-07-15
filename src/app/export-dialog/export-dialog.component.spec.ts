import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExportDialogComponent} from './export-dialog.component';
import {FormsModule} from '@angular/forms';
import {MdDialogModule, MdDialogRef, MdInputModule, MdSelectModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Exporter} from '../graph/export/exporter';
import {GraphService} from '../graph/graph.service';

describe('ExportDialogComponent', () => {
  let component: ExportDialogComponent;
  let fixture: ComponentFixture<ExportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FormsModule, MdSelectModule, MdDialogModule, MdInputModule],
      declarations: [ExportDialogComponent],
      providers: [
        GraphService,
        {provide: MdDialogRef, useValue: {}},
        {
          provide: Exporter, useValue: [{
          getGraphFormat: () => {
            return {
              extensions: []
            };
          }
        }]
        }
      ]
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
