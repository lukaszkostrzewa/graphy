import * as jquery from "jquery";
import cytoscape from "cytoscape/dist/cytoscape.js";
import contextMenus from "cytoscape-context-menus";
import {GraphComponent} from "../graph.component";
import {AfterViewInit, Directive, OnDestroy} from "@angular/core";
import ContextMenu = Cy.ContextMenu;
import Event = JQuery.Event;
import {GraphService} from "../graph.service";
import {Subscription} from "rxjs/Subscription";

@Directive({
  selector: 'app-graph',
  providers: [GraphService]
})
export class ContextMenusExtension implements AfterViewInit, OnDestroy {

  private static readonly ITEMS_VISIBLE_IN_EDIT_MODE = [
    'add-node', 'add-edge', 'remove', 'edit', 'group', 'ungroup'
  ];
  private contextMenu: ContextMenu;
  private subscription: Subscription;

  constructor(private graphComponent: GraphComponent, private graphService: GraphService) {
    this.subscription = graphService.editObservable.subscribe({
      next: value => {
        if (value) {
          this.editModeActivated();
        } else {
          this.editModeDeactivated();
        }
      }
    })
  }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
