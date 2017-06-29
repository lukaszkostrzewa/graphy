import {PluginHandler} from "./plugin-handler";

export class NodeAdditionPluginHandler implements PluginHandler {

  constructor(private cy: Cy.Instance) {
  }

  editModeActivated(): void {
    this.cy.on('click', this.addNodeOnClickEvent);
  }

  editModeDeactivated(): void {
    this.cy.off('click', this.addNodeOnClickEvent);
  }

  private addNodeOnClickEvent = (event) => {
    if (event.target === this.cy) {
      let pos = {
        x: event.originalEvent.offsetX,
        y: event.originalEvent.offsetY
      };
      this.cy.add({
        group: "nodes",
        data: {
          id: '' + this.cy.nodes().length
        },
        renderedPosition: pos
      });
    }
  };
}
