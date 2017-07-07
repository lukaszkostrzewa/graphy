import {Injectable} from "@angular/core";
import {Exporter} from "./exporter";
import {ExportResult} from "./export-result";

@Injectable()
export class GraphmlExporter extends Exporter {

  doExport(): ExportResult {
    return {
      blob: new Blob([this.graphService.getCy().graphml()], {
        type: "application/xml"
      }),
      extension: 'xml'
    };
  }

  id(): string {
    return 'graphml';
  }
}
