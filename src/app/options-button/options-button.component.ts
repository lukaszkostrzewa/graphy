import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdDialog} from '@angular/material';
import {GraphOptionsDialogComponent} from '../graph-options-dialog/graph-options-dialog.component';
import {GraphOptions} from '../common/graph-options';

@Component({
  selector: 'app-options-button',
  templateUrl: './options-button.component.html',
  styleUrls: ['./options-button.component.scss']
})
export class OptionsButtonComponent implements OnInit {

  @Output() optionsChanged = new EventEmitter<boolean>();
  @Input() graphOptions: GraphOptions;

  constructor(private dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openGraphOptionsDialog() {
    this.dialog.open(GraphOptionsDialogComponent, {
      data: this.graphOptions,
      width: '400px'
    }).afterClosed()
      .subscribe(result => result && this.optionsChanged.emit(result));
  }
}
