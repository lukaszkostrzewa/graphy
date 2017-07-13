import {Component} from '@angular/core';
import {ExportGraphOptions} from '../common/export-graph-options';
import {ExportFormat} from '../common/export-format';
import * as moment from 'moment';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent {

  supportedFormats: ExportFormat[] = ExportFormat.all();
  options: ExportGraphOptions = new ExportGraphOptions();

  constructor() {
    this.setDefaultFilename();
  }

  private setDefaultFilename() {
    const date = moment().format('DD-MM-YYYY-HH-mm-ss');
    this.options.filename = 'graph-' + date;
  }
}
