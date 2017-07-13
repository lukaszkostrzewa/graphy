import {inject, TestBed} from '@angular/core/testing';

import {ExportService} from './export.service';
import {Exporter} from './exporter';

describe('ExportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportService, {provide: Exporter, useValue: []}]
    });
  });

  it('should be created', inject([ExportService], (service: ExportService) => {
    expect(service).toBeTruthy();
  }));
});
