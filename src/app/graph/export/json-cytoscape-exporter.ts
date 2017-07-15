import {Injectable} from '@angular/core';
import {Exporter} from './exporter';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class JsonCytoscapeExporter extends Exporter {

  doExport(): Blob {
    return new Blob([JSON.stringify(this.graphService.getCy().json())], {
      type: 'application/json'
    });
  }

  getGraphFormat(): GraphFormat {
    return {
      id: 'json-cytoscape',
      name: 'JSON Cytoscape',
      extensions: ['.json']
    };
  }
}
