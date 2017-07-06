import {Directive} from "@angular/core";
import {GraphService} from "../graph.service";
import {EditModeAwareExtension} from "./edit-mode-aware.extension";

@Directive({
  selector: 'app-graph',
  providers: [GraphService]
})
export class NodeAdditionExtension extends EditModeAwareExtension {

  private wasDeselected: boolean = false;

  editModeActivated() {
    this.graphComponent.getCy().on('tapstart', this.deselectIfThereAreSelectedElements);
    this.graphComponent.getCy().on('click', this.addNodeOnClickIfNotDeselected);
  }

  editModeDeactivated() {
    this.graphComponent.getCy().off('tapstart', this.deselectIfThereAreSelectedElements);
    this.graphComponent.getCy().off('click', this.addNodeOnClickIfNotDeselected);
  }

  private addNodeOnClickIfNotDeselected = (event) => {
    if (this.isClickOnViewport(event) && this.wasDeselected) {
      this.graphComponent.addNodeAtPos({
        x: event.originalEvent.offsetX,
        y: event.originalEvent.offsetY
      });
    }
  };

  private deselectIfThereAreSelectedElements = (event) => {
    this.wasDeselected = true;
    if (this.isClickOnViewport(event) && this.graphComponent.hasSelectedElements()) {
      this.wasDeselected = false;
      this.graphComponent.deselect();
      return true;
    }
  };

  private isClickOnViewport(event) {
    return event.target === this.graphComponent.getCy();
  }
}
