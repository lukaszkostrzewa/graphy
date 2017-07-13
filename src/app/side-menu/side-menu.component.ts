import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdSidenav} from '@angular/material';
import {ImportDialogComponent} from '../import-dialog/import-dialog.component';
import {GraphComponent} from '../graph/graph.component';
import {NewDialogComponent} from '../new-dialog/new-dialog.component';
import {ImportGraphResult} from '../common/import-graph-result';
import {ExportDialogComponent} from '../export-dialog/export-dialog.component';
import {ShortcutsDialogComponent} from '../shortcuts-dialog/shortcuts-dialog.component';
import {MainToolbarComponent} from '../main-toolbar/main-toolbar.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() sideNav: MdSidenav;
  @Input() graphComponent: GraphComponent;
  @Input() mainToolbar: MainToolbarComponent;

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
    this.dialog.open(ExportDialogComponent, {width: '400px'}).afterClosed()
      .subscribe(options => {
        if (options) {
          this.graphComponent.exportGraph(options);
          this.sideNav.close();
        }
      });
  }

  newGraph() {
    this.dialog.open(NewDialogComponent).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.graphComponent.newGraph();
        this.sideNav.close();
      }
    });
  }

  showShortcutsDialog() {
    this.sideNav.close();
    this.dialog.open(ShortcutsDialogComponent, {width: '600px'});
  }

  openGitHub() {
    this.sideNav.close();
    window.open('https://github.com/lukaszkostrzewa/graphy/issues', '_blank');
  }
}
