import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MdButtonToggleChange} from "@angular/material";
import {GraphComponent} from "../graph/graph.component";

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent {

  @Output() navToggle = new EventEmitter<boolean>();
  @Input() graphComponent: GraphComponent;

  openSideNav() {
    this.navToggle.emit(true);
  }

  editToggleEvent(e: MdButtonToggleChange) {
    this.graphComponent.setEditMode(e.source.checked);
  }

  runAlgorithm(algorithm: string) {
    this.graphComponent.runAlgorithm(algorithm);
  }
}
