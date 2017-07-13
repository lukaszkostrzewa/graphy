import {ExportFormat} from "./export-format";

export class ExportGraphOptions {

  filename: string;
  format: ExportFormat = ExportFormat.jsonCytoscape();

  getFullName() {
    return this.filename + '.' + this.format.extension;
  }
}
