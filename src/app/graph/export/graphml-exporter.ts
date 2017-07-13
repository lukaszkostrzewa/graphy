import {Injectable} from "@angular/core";
import {Exporter} from "./exporter";

@Injectable()
export class GraphmlExporter extends Exporter {

  doExport(): Blob {
    return new Blob([this.graphService.getCy().graphml()], {
      type: "application/xml"
    });
  }

  id(): string {
    return 'graphml';
  }
}
