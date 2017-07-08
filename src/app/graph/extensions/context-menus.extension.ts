import * as jquery from "jquery";
import cytoscape from "cytoscape/dist/cytoscape.js";
import contextMenus from "cytoscape-context-menus";
import {AfterViewInit, Directive} from "@angular/core";
import {GraphService} from "../graph.service";
import {EditModeAwareExtension} from "./edit-mode-aware.extension";
import ContextMenu = Cy.ContextMenu;
import Event = JQuery.Event;

@Directive({
  selector: 'app-graph',
  providers: [GraphService]
})
export class ContextMenusExtension extends EditModeAwareExtension implements AfterViewInit {

  private static readonly ITEMS_VISIBLE_IN_EDIT_MODE = [
    'add-node', 'add-edge', 'remove', 'edit', 'group', 'ungroup'
  ];
  private contextMenu: ContextMenu;

  ngAfterViewInit(): void {
    contextMenus(cytoscape, jquery);
    let options = {
      menuItems: this.getMenuItems(),
      container: this.graphComponent.getCy().container().parentElement
    };
    this.contextMenu = this.graphComponent.getCy().contextMenus(options);
  }

  editModeActivated(): void {
    ContextMenusExtension.ITEMS_VISIBLE_IN_EDIT_MODE
      .forEach(item => this.contextMenu.showMenuItem(item));
  }

  editModeDeactivated(): void {
    ContextMenusExtension.ITEMS_VISIBLE_IN_EDIT_MODE
      .forEach(item => this.contextMenu.hideMenuItem(item));
  }

  private getMenuItems() {
    return [
      {
        id: 'add-node',
        content: 'Add node',
        selector: false,
        onClickFunction: (event) => {
          let node = this.graphComponent.addNodeAtPos({
            x: event.originalEvent.offsetX,
            y: event.originalEvent.offsetY
          });
          this.graphComponent.openEditDialog(node);
        },
        coreAsWell: true,
        show: false
      },
      {
        id: 'add-edge',
        content: 'Add edge',
        selector: 'node',
        onClickFunction: (event) =>
          this.graphComponent.getCy().edgehandles('start', event.target.id()),
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
        onClickFunction: () => this.graphComponent.groupSelectedNodes(),
        coreAsWell: true,
        show: false
      },
      {
        id: 'ungroup',
        content: 'Ungroup',
        selector: 'node, edge',
        onClickFunction: () => this.graphComponent.ungroupSelectedNode(),
        coreAsWell: true,
        hasTrailingDivider: true,
        show: false
      },
      {
        id: 'copy',
        content: 'Copy',
        selector: 'node, edge',
        onClickFunction: event => this.graphComponent.copy(event.target),
        coreAsWell: true,
      },
      {
        id: 'cut',
        content: 'Cut',
        selector: 'node, edge',
        onClickFunction: event => this.graphComponent.cut(event.target),
        coreAsWell: true,
      },
      {
        id: 'paste',
        content: 'Paste',
        selector: 'node, edge',
        onClickFunction: () => this.graphComponent.paste(),
        coreAsWell: true,
        hasTrailingDivider: true
      },
      {
        id: 'undo',
        content: 'Undo',
        selector: 'node, edge',
        onClickFunction: () => this.graphComponent.undo(),
        coreAsWell: true
      },
      {
        id: 'redo',
        content: 'Redo',
        selector: 'node, edge',
        onClickFunction: () => this.graphComponent.redo(),
        coreAsWell: true
      }
    ];
  }
}
