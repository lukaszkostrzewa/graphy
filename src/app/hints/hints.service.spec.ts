import {TestBed, inject} from '@angular/core/testing';

import {HintsService} from './hints.service';

describe('HintsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HintsService]
    });
  });

  it('should be created', inject([HintsService], (service: HintsService) => {
    expect(service).toBeTruthy();
  }));
});
