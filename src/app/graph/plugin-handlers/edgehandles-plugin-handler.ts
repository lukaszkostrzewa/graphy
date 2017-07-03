import {PluginHandler} from "./plugin-handler";
import cytoscape from 'cytoscape/dist/cytoscape.js';
import edgehandles from 'cytoscape-edgehandles';
import {GraphComponent} from "../graph.component";

export class EdgehandlesPluginHandler implements PluginHandler {

  constructor(private graphComponent: GraphComponent) {
    edgehandles(cytoscape);
    let defaults = {
      handleHitThreshold: 12,
      handleColor: '#3f51b5',
      hoverDelay: 0,
      enabled: false,
      loopAllowed: () => true,
      toggleOffOnLeave: true,
      edgeParams: (source, target) => {
        return {
          data: {
            source: source.id(),
            target: target.id(),
            id: this.graphComponent.getNextEdgeId()
          }
        }
      }
    };
    this.graphComponent.getCy().edgehandles(defaults);
  }

  editModeActivated(): void {
    this.graphComponent.getCy().edgehandles('enable');
  }

  editModeDeactivated(): void {
    this.graphComponent.getCy().edgehandles('disable');
  }
}
