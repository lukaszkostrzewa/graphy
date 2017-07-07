import {Parser} from "./parser";
import cytoscape from "cytoscape/dist/cytoscape.js";
import graphml from "cytoscape-graphml";
import {Injectable} from "@angular/core";
import {GraphService} from "../graph.service";

@Injectable()
export class GraphmlParser extends Parser {

  constructor(graphService: GraphService) {
    super(graphService);
    graphml(cytoscape, jQuery);
  }

  parse(content: string): void {
    this.graphService.getCy().graphml(content);
  }

  id(): string {
    return 'graphml';
  }
}
