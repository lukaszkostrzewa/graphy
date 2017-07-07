import {Injectable} from "@angular/core";
import {Exporter} from "./exporter";
import {ExportResult} from "./export-result";

@Injectable()
export class JsonExporter extends Exporter {

  doExport(): ExportResult {
    return {
      blob: new Blob([JSON.stringify(this.graphService.getCy().json())], {
        type: "application/json"
      }),
      extension: 'json'
    };
  }

  id(): string {
    return 'json';
  }
}
