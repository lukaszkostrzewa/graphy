import {Component} from '@angular/core';
import {ExportGraphOptions} from '../common/export-graph-options';
import * as moment from 'moment';
import {ExportService} from '../graph/export/export.service';
import {GraphFormat} from '../common/graph-format';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss'],
  providers: [ExportService]
})
export class ExportDialogComponent {

  supportedFormats: GraphFormat[];
  options: ExportGraphOptions = new ExportGraphOptions();

  constructor(private exportService: ExportService) {
    this.supportedFormats = this.exportService.getAvailableFormats();
    this.options.format = this.supportedFormats[0];
    this.setDefaultFilename();
  }

  private setDefaultFilename() {
    const date = moment().format('DD-MM-YYYY-HH-mm-ss');
    this.options.filename = 'graph-' + date;
  }
}
