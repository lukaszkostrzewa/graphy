import {PluginHandler} from "./plugin-handler";
import * as jquery from "jquery";
import cytoscape from 'cytoscape/dist/cytoscape.js';
import contextMenus from 'cytoscape-context-menus';
import ContextMenu = Cy.ContextMenu;
import {GraphComponent} from "../graph.component";
import Event = JQuery.Event;

export class ContextMenusPluginHandler implements PluginHandler {

  private static readonly ITEMS_VISIBLE_IN_EDIT_MODE = [
    'add-node', 'add-edge', 'remove', 'edit', 'group'
  ];
  private contextMenu: ContextMenu;

  constructor(private graphComponent: GraphComponent) {
    contextMenus(cytoscape, jquery);
    let options = {
      menuItems: this.getMenuItems(),
      container: graphComponent.getCy().container().parentElement
    };
    this.contextMenu = graphComponent.getCy().contextMenus(options);
  }

  editModeActivated(): void {
    ContextMenusPluginHandler.ITEMS_VISIBLE_IN_EDIT_MODE
      .forEach(item => this.contextMenu.showMenuItem(item));
  }

  editModeDeactivated(): void {
    ContextMenusPluginHandler.ITEMS_VISIBLE_IN_EDIT_MODE
      .forEach(item => this.contextMenu.hideMenuItem(item));
  }

  private getMenuItems() {
    return [
      {
        id: 'add-node',
        content: 'Add node',
        selector: false,
        onClickFunction: (event) => {
          this.graphComponent.addNodeAtPos({
            x: event.originalEvent.offsetX,
            y: event.originalEvent.offsetY
          });
        },
        coreAsWell: true,
        show: false
      },
      {
        id: 'add-edge',
        content: 'Add edge',
        selector: 'node',
        onClickFunction: function () {
          console.log('Add edge action');
        },
        show: false
      },
      {
        id: 'remove',
        content: 'Remove',
        selector: 'node, edge',
        onClickFunction: (event: Event) => {
          console.log(event);
          this.graphComponent.deleteElement(event.target)
        },
        show: false
      },
      {
        id: 'edit',
        content: 'Edit',
        selector: 'node, edge',
        onClickFunction: (event: Event) => {
          this.graphComponent.openEditDialog(event.target);
        },
        hasTrailingDivider: true,
        show: false
      },
      {
        id: 'select-all',
        content: 'Select all',
        selector: 'node, edge',
        onClickFunction: () => this.graphComponent.selectAll(),
        coreAsWell: true
      },
      {
        id: 'group',
        content: 'Group',
        selector: 'node, edge',
        onClickFunction: function () {
          console.log('Group all');
        },
        coreAsWell: true,
        hasTrailingDivider: true,
        show: false
      },
      {
        id: 'copy',
        content: 'Copy',
        selector: 'node, edge',
        onClickFunction: function () {
          console.log('Copy');
        },
        coreAsWell: true,
      },
      {
        id: 'cut',
        content: 'Cut',
        selector: 'node, edge',
        onClickFunction: function () {
          console.log('Cut');
        },
        coreAsWell: true,
      },
      {
        id: 'paste',
        content: 'Paste',
        selector: 'node, edge',
        onClickFunction: function () {
          console.log('Paste');
        },
        coreAsWell: true,
        hasTrailingDivider: true
      },
      {
        id: 'undo',
        content: 'Undo',
        selector: 'node, edge',
        onClickFunction: function () {
          console.log('Undo');
        },
        coreAsWell: true
      },
      {
        id: 'redo',
        content: 'Redo',
        selector: 'node, edge',
        onClickFunction: function () {
          console.log('Redo');
        },
        coreAsWell: true
      }
    ];
  }
}
