import {Injectable} from '@angular/core';
import {GraphFormat} from "./graph-format";

@Injectable()
export class GraphFormatsService {

  constructor() {
  }

  getSupportedFormats(): GraphFormat[] {
    return [{
      id: 'json-graph',
      name: 'JSON Graph',
      extensions: ['.json', '.txt']
    }, {
      id: 'json-cytoscape',
      name: 'JSON Cytoscape',
      extensions: ['.json', '.txt']
    }, {
      id: 'graphml',
      name: 'GraphML',
      extensions: ['.graphml', '.xml']
    }];
  }
}
