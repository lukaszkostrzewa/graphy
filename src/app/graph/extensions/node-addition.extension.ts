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
    this.graphComponent.getCy().on('tap', this.addNodeOnClickIfNotDeselected);
  }

  editModeDeactivated() {
    this.graphComponent.getCy().off('tapstart', this.deselectIfThereAreSelectedElements);
    this.graphComponent.getCy().off('tap', this.addNodeOnClickIfNotDeselected);
  }

  private addNodeOnClickIfNotDeselected = (event) => {
    if (this.isClickOnViewport(event) && this.wasDeselected) {
      this.graphComponent.addNodeAtPos(this.getPosition(event));
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

  private getPosition(event: any) {
    if (event.originalEvent.type === 'touchend') {
      let touches = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
      return {x: touches.pageX, y: touches.pageY};
    }
    return {x: event.originalEvent.offsetX, y: event.originalEvent.offsetY};
  }
}
