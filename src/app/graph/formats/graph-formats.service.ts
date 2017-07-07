import {Injectable} from '@angular/core';
import {GraphFormat} from "./graph-format";

@Injectable()
export class GraphFormatsService {

  constructor() {
  }

  getSupportedFormats(): GraphFormat[] {
    return [{
      id: 'json',
      name: 'JSON',
      extensions: ['.json', '.txt']
    }, {
      id: 'graphml',
      name: 'GraphML',
      extensions: ['.graphml', '.xml']
    }];
  }
}
