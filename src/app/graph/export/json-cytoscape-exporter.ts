import {Injectable} from "@angular/core";
import {Exporter} from "./exporter";

@Injectable()
export class JsonCytoscapeExporter extends Exporter {

  doExport(): Blob {
    return new Blob([JSON.stringify(this.graphService.getCy().json())], {
      type: "application/json"
    });
  }

  id(): string {
    return 'json-cytoscape';
  }
}
