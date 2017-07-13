import {Injectable} from '@angular/core';
import {Exporter} from './exporter';

@Injectable()
export class PngExporter extends Exporter {

  doExport(): Blob {
    return this.graphService.getCy().png({output: 'blob'}) as Blob;
  }

  id(): string {
    return 'png';
  }
}
