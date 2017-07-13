import {inject, TestBed} from '@angular/core/testing';

import {AlgorithmService} from './algorithm.service';
import {AlgorithmRunner} from './algorithm-runner';
import {GraphService} from '../graph.service';

describe('AlgorithmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlgorithmService,
        {
          provide: AlgorithmRunner,
          useValue: []
        },
        GraphService
      ]
    });
  });

  it('should be created', inject([AlgorithmService], (service: AlgorithmService) => {
    expect(service).toBeTruthy();
  }));
});
