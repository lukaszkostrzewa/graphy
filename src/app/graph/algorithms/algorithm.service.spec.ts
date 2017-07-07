import {TestBed, inject} from '@angular/core/testing';

import {AlgorithmService} from './algorithm.service';

describe('AlgorithmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlgorithmService]
    });
  });

  it('should be created', inject([AlgorithmService], (service: AlgorithmService) => {
    expect(service).toBeTruthy();
  }));
});
