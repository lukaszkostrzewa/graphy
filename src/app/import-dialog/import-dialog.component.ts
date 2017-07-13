import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {GraphFormatsService} from '../graph/formats/graph-formats.service';
import {GraphFormat} from '../graph/formats/graph-format';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
  providers: [GraphFormatsService]
})
export class ImportDialogComponent implements OnInit {

  supportedFormats: GraphFormat[];
  selectedFormat: GraphFormat;

  constructor(public dialogRef: MdDialogRef<ImportDialogComponent>,
              private graphFormatsService: GraphFormatsService) {
    this.supportedFormats = this.graphFormatsService.getSupportedFormats();
  }

  ngOnInit() {
  }

  closeDialog(content) {
    this.dialogRef.close({type: this.selectedFormat.id, content});
  }
}
