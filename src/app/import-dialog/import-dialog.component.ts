import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {GraphFormat} from '../common/graph-format';
import {ParserService} from '../graph/parsers/parser.service';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
  providers: [ParserService]
})
export class ImportDialogComponent implements OnInit {

  supportedFormats: GraphFormat[];
  selectedFormat: GraphFormat;

  constructor(public dialogRef: MdDialogRef<ImportDialogComponent>,
              private parserService: ParserService) {
    this.supportedFormats = this.parserService.getAvailableFormats();
  }

  ngOnInit() {
  }

  closeDialog(content) {
    this.dialogRef.close({type: this.selectedFormat.id, content});
  }
}
