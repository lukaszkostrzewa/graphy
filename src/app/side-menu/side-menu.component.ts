import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdSidenav} from "@angular/material";
import {ImportDialogComponent} from "../import-dialog/import-dialog.component";
import {GraphComponent} from "../graph/graph.component";
import {NewDialogComponent} from "../new-dialog/new-dialog.component";
import {ImportGraphResult} from "../common/ImportGraphResult";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() sideNav: MdSidenav;
  @Input() graphComponent: GraphComponent;

  constructor(private dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openImportDialog() {
    this.dialog.open(ImportDialogComponent, {width: '400px', height: '180px'}).afterClosed()
      .subscribe((result: ImportGraphResult) => {
        if (result) {
          this.graphComponent.parseAndInit(result);
          this.sideNav.close();
        }
      });
  }

  exportGraph() {
    this.graphComponent.exportGraph('graphml');
  }

  newGraph() {
    this.dialog.open(NewDialogComponent).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.graphComponent.newGraph();
        this.sideNav.close();
      }
    });
  }
}
