import {GraphService} from '../graph.service';
import {Injectable} from '@angular/core';

@Injectable()
export class Parser {

  constructor(protected graphService: GraphService) {
  }

  public parse(content: string): void {
    throw new Error('Method parse not implemented');
  }

  public id(): string {
    throw new Error('Method id not implemented');
  }
}
