import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdSidenav} from "@angular/material";
import {ImportDialogComponent} from "../import-dialog/import-dialog.component";
import {GraphComponent} from "../graph/graph.component";

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
    this.dialog.open(ImportDialogComponent).afterClosed().subscribe((result: string) => {
      if (result) {
        this.graphComponent.parseAndInit(result);
        this.sideNav.close();
      }
    });
  }

  exportGraph() {
    this.graphComponent.exportGraph('graphml');
  }
}
