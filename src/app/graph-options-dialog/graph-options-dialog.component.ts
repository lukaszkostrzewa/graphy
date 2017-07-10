import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-graph-options-dialog',
  templateUrl: './graph-options-dialog.component.html',
  styleUrls: ['./graph-options-dialog.component.scss']
})
export class GraphOptionsDialogComponent implements OnInit {

  public directedGraph: boolean;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.directedGraph = data.directedGraph;
  }

  ngOnInit() {
  }
}
