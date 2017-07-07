import {Inject, Injectable} from '@angular/core';
import {ExportResult} from "./export-result";
import {Exporter} from "./exporter";

@Injectable()
export class ExportService {

  private exporters: { [key: string]: Exporter } = {};

  constructor(@Inject(Exporter) exporters: Exporter[]) {
    exporters.forEach(exporter => this.exporters[exporter.id()] = exporter);
  }

  doExport(type: string): ExportResult {
    return this.exporters[type].doExport();
  }
}
