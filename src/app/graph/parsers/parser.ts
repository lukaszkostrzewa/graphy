import {GraphService} from '../graph.service';
import {Injectable} from '@angular/core';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class Parser {

  constructor(protected graphService: GraphService) {
  }

  public parse(content: string): void {
    throw new Error('Method parse not implemented');
  }

  public getGraphFormat(): GraphFormat {
    throw new Error('Method getGraphFormat not implemented');
  }
}
