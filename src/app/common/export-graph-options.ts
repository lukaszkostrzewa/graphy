import {GraphFormat} from './graph-format';

export class ExportGraphOptions {

  filename: string;
  format: GraphFormat;

  getFullName() {
    return this.filename + this.format.extensions[0];
  }
}
