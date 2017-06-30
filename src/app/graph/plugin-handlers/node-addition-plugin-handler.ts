import {PluginHandler} from "./plugin-handler";
import {GraphComponent} from "../graph.component";

export class NodeAdditionPluginHandler implements PluginHandler {

  constructor(private graphComponent: GraphComponent) {
  }

  editModeActivated(): void {
    this.graphComponent.getCy().on('click', this.addNodeOnClickEvent);
  }

  editModeDeactivated(): void {
    this.graphComponent.getCy().off('click', this.addNodeOnClickEvent);
  }

  private addNodeOnClickEvent = (event) => {
    if (event.target === this.graphComponent.getCy()) {
      this.graphComponent.addNodeAtPos({
        x: event.originalEvent.offsetX,
        y: event.originalEvent.offsetY
      });
    }
  };
}
