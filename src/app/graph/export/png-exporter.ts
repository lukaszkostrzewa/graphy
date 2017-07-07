import {Injectable} from "@angular/core";
import {Exporter} from "./exporter";
import {ExportResult} from "./export-result";

@Injectable()
export class PngExporter extends Exporter {

  doExport(): ExportResult {
    return {
      blob: <Blob>this.graphService.getCy().png({output: 'blob'}),
      extension: 'png'
    }
  }

  id(): string {
    return 'png';
  }
}
