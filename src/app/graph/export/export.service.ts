import {Inject, Injectable} from "@angular/core";
import {Exporter} from "./exporter";

@Injectable()
export class ExportService {

  private exporters: { [key: string]: Exporter } = {};

  constructor(@Inject(Exporter) exporters: Exporter[]) {
    exporters.forEach(exporter => this.exporters[exporter.id()] = exporter);
  }

  doExport(type: string): Blob {
    return this.exporters[type].doExport();
  }
}
