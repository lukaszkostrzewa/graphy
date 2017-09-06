import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {GraphOptions} from '../common/graph-options';

@Component({
  selector: 'app-graph-options-dialog',
  templateUrl: './graph-options-dialog.component.html',
  styleUrls: ['./graph-options-dialog.component.scss']
})
export class GraphOptionsDialogComponent implements OnInit {

  public options: GraphOptions;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.options = Object.assign({}, data);
  }

  ngOnInit() {
  }
}
