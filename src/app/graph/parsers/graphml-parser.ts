import {Parser} from "./parser";
import cytoscape from 'cytoscape/dist/cytoscape.js';
import graphml from 'cytoscape-graphml';

export class GraphmlParser implements Parser {

  constructor(private cy: Cy.Instance) {
    graphml(cytoscape, jQuery);
  }

  canParse(content: string): boolean {
    return true;
  }

  parse(content: string): void {
    this.cy.graphml(content);
  }
}
