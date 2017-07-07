import {Injectable} from "@angular/core";
import {Exporter} from "./exporter";
import {ExportResult} from "./export-result";

@Injectable()
export class JpgExporter extends Exporter {

  doExport(): ExportResult {
    return {
      blob: <Blob>this.graphService.getCy().jpg({output: 'blob'}),
      extension: 'jpg'
    }
  }

  id(): string {
    return 'jpg';
  }
}
