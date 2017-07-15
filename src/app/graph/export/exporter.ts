import {GraphService} from '../graph.service';
import {Injectable} from '@angular/core';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class Exporter {

  constructor(protected graphService: GraphService) {
  }

  public doExport(): Blob {
    throw new Error('Method doExport not implemented');
  }

  getGraphFormat(): GraphFormat {
    throw new Error('Method getGraphFormat not implemented');
  }
}
