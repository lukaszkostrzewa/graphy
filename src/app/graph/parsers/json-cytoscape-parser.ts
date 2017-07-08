import {Parser} from "./parser";
import {Injectable} from "@angular/core";

@Injectable()
export class JsonCytoscapeParser extends Parser {

  parse(content: string): void {
    let {elements} = JSON.parse(content);
    this.graphService.getCy().json({elements});
  }

  id(): string {
    return 'json-cytoscape';
  }
}
