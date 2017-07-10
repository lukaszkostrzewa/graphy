import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdDialog} from "@angular/material";
import {GraphOptionsDialogComponent} from "../graph-options-dialog/graph-options-dialog.component";

@Component({
  selector: 'app-options-button',
  templateUrl: './options-button.component.html',
  styleUrls: ['./options-button.component.scss']
})
export class OptionsButtonComponent implements OnInit {

  @Output() directionalityChanged = new EventEmitter<boolean>();
  @Input() directedGraph: boolean;

  constructor(private dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openGraphOptionsDialog() {
    this.dialog.open(GraphOptionsDialogComponent, {
      data: {directedGraph: this.directedGraph},
      width: '400px'
    }).afterClosed()
      .subscribe(result => this.directionalityChanged.emit(result));
  }
}
