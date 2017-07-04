import {PluginHandler} from "./plugin-handler";
import {GraphComponent} from "../graph.component";

export class NodeAdditionPluginHandler implements PluginHandler {

  private wasDeselected: boolean = false;

  constructor(private graphComponent: GraphComponent) {
  }

  editModeActivated(): void {
    this.graphComponent.getCy().on('tapstart', this.deselectIfThereAreSelectedElements);
    this.graphComponent.getCy().on('click', this.addNodeOnClickIfNotDeselected);
  }

  editModeDeactivated(): void {
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
