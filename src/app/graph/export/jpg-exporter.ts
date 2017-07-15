import {Injectable} from '@angular/core';
import {Exporter} from './exporter';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class JpgExporter extends Exporter {

  doExport(): Blob {
    return this.graphService.getCy().jpg({output: 'blob'}) as Blob;
  }

  getGraphFormat(): GraphFormat {
    return {
      id: 'jpg',
      name: 'JPG',
      extensions: ['.jpg']
    };
  }
}
