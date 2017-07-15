import {Inject, Injectable} from '@angular/core';
import {Exporter} from './exporter';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class ExportService {

  private exportersMap: { [key: string]: Exporter } = {};

  constructor(@Inject(Exporter) private exporters: Exporter[]) {
    exporters.forEach(exporter => this.exportersMap[exporter.getGraphFormat().id] = exporter);
  }

  doExport(type: string): Blob {
    return this.exportersMap[type].doExport();
  }

  getAvailableFormats(): GraphFormat[] {
    return this.exporters.map(exporter => exporter.getGraphFormat());
  }
}
