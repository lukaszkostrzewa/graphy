import {Parser} from './parser';
import {Injectable} from '@angular/core';

@Injectable()
export class JsonGraphParser extends Parser {

  parse(content: string): void {
    const graph = JSON.parse(content).graph;
    const edges = graph.edges.map((edge, i) => {
      return {
        id: 'edge_' + i,
        ...edge
      }
    });
    const elements = graph.nodes.concat(edges).map(data => {
      return {data};
    });
    this.graphService.getCy().json({elements});
  }

  id(): string {
    return 'json-graph';
  }
}
