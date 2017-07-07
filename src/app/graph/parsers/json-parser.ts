import {Parser} from "./parser";
import {Injectable} from "@angular/core";

@Injectable()
export class JsonParser extends Parser {

  parse(content: string): void {
    let graph = JSON.parse(content).graph;
    let edges = graph.edges.map((edge, i) => {
      return {
        id: 'edge_' + i,
        ...edge
      }
    });
    let elements = graph.nodes.concat(edges).map(data => {
      return {data};
    });
    this.graphService.getCy().json({elements});
  }

  id(): string {
    return 'json';
  }
}
