import {Injectable} from '@angular/core';
import {Exporter} from './exporter';

@Injectable()
export class JpgExporter extends Exporter {

  doExport(): Blob {
    return this.graphService.getCy().jpg({output: 'blob'}) as Blob;
  }

  id(): string {
    return 'jpg';
  }
}
