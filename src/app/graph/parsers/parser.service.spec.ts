import {TestBed, inject} from '@angular/core/testing';

import {ParserService} from './parser.service';
import {Parser} from "./parser";

describe('ParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ParserService,
        {
          provide: Parser,
          useValue: []
        }
      ]
    });
  });

  it('should be created', inject([ParserService], (service: ParserService) => {
    expect(service).toBeTruthy();
  }));
});
