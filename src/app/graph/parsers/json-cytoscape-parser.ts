import {Parser} from './parser';
import {Injectable} from '@angular/core';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class JsonCytoscapeParser extends Parser {

  parse(content: string): void {
    const {elements} = JSON.parse(content);
    this.graphService.getCy().json({elements});
  }

  getGraphFormat(): GraphFormat {
    return {
      id: 'json-cytoscape',
      name: 'JSON Cytoscape',
      extensions: ['.json', '.txt']
    };
  }
}
