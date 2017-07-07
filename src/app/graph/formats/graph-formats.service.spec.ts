import {TestBed, inject} from '@angular/core/testing';

import {GraphFormatsService} from './graph-formats.service';

describe('GraphFormatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphFormatsService]
    });
  });

  it('should be created', inject([GraphFormatsService], (service: GraphFormatsService) => {
    expect(service).toBeTruthy();
  }));
});
