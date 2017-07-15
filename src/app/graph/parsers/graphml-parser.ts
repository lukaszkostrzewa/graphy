import {Parser} from './parser';
import cytoscape from 'cytoscape/dist/cytoscape.js';
import * as graphml from 'cytoscape-graphml';
import {Injectable} from '@angular/core';
import {GraphService} from '../graph.service';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class GraphmlParser extends Parser {

  constructor(graphService: GraphService) {
    super(graphService);
    graphml(cytoscape, jQuery);
  }

  parse(content: string): void {
    this.graphService.getCy().graphml(content);
  }

  getGraphFormat(): GraphFormat {
    return {
      id: 'graphml',
      name: 'GraphML',
      extensions: ['.graphml', '.xml']
    };
  }
}
