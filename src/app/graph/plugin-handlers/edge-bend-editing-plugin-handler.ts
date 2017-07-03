import {PluginHandler} from "./plugin-handler";
import {GraphComponent} from "../graph.component";
import * as jquery from "jquery";
import cytoscape from 'cytoscape/dist/cytoscape.js';
import edgeBendEditing from 'cytoscape-edge-bend-editing';

export class EdgeBendEditingPluginHandler implements PluginHandler {

  constructor(private graphComponent: GraphComponent) {
    edgeBendEditing(cytoscape, jquery);
    this.graphComponent.getCy().edgeBendEditing({
      addBendMenuItemTitle: "Add Bend Point",
      removeBendMenuItemTitle: "Remove Bend Point"
    });
  }

  editModeActivated(): void {
  }

  editModeDeactivated(): void {
  }
}
