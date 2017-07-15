import {Injectable} from '@angular/core';
import {Exporter} from './exporter';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class PngExporter extends Exporter {

  doExport(): Blob {
    return this.graphService.getCy().png({output: 'blob'}) as Blob;
  }

  getGraphFormat(): GraphFormat {
    return {
      id: 'png',
      name: 'PNG',
      extensions: ['.png']
    };
  }
}
