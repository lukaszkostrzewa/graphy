import {Injectable} from '@angular/core';
import {Exporter} from './exporter';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class GraphmlExporter extends Exporter {

  doExport(): Blob {
    return new Blob([this.graphService.getCy().graphml()], {
      type: 'application/xml'
    });
  }

  getGraphFormat(): GraphFormat {
    return {
      id: 'graphml',
      name: 'GraphML',
      extensions: ['.xml']
    };
  }
}
