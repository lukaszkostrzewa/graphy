import {PluginHandler} from "./plugin-handler";
import cytoscape from 'cytoscape/dist/cytoscape.js';
import edgehandles from 'cytoscape-edgehandles';

export class EdgehandlesPluginHandler implements PluginHandler {

  constructor(private cy: Cy.Instance) {
    edgehandles(cytoscape);
    let defaults = {
      handleHitThreshold: 12,
      handleColor: '#3f51b5',
      hoverDelay: 0,
      enabled: false,
      loopAllowed: () => true
    };
    this.cy.edgehandles(defaults);
  }

  editModeActivated(): void {
    this.cy.edgehandles('enable');
  }

  editModeDeactivated(): void {
    this.cy.edgehandles('disable');
  }
}
