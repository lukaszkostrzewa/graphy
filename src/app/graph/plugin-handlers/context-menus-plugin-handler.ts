import {PluginHandler} from "./plugin-handler";
import * as jquery from "jquery";
import cytoscape from 'cytoscape/dist/cytoscape.js';
import contextMenus from 'cytoscape-context-menus';

export class ContextMenusPluginHandler implements PluginHandler {

  constructor(private cy: Cy.Instance) {
    contextMenus(cytoscape, jquery);
    let options = {
      // List of initial menu items
      menuItems: [
        {
          id: 'remove', // ID of menu item
          content: 'Remove', // Display content of menu item
          tooltipText: 'Remove', // Tooltip text for menu item
          // Filters the elements to have this menu item on cxttap
          // If the selector is not truthy no elements will have this menu item on cxttap
          selector: 'node, edge',
          onClickFunction: function () { // The function to be executed on click
            console.log('remove element');
          },
          disabled: false, // Whether the item will be created as disabled
          show: true, // Whether the item will be shown or not
          hasTrailingDivider: true, // Whether the item will have a trailing divider
          coreAsWell: false // Whether core instance have this item on cxttap
        },
        {
          id: 'hide',
          content: 'Hide',
          tooltipText: 'Hide',
          selector: 'node, edge',
          onClickFunction: function () {
            console.log('hide element');
          },
          disabled: false
        },
        {
          id: 'add-node',
          content: 'Add node',
          tooltipText: 'Add node',
          selector: 'node',
          coreAsWell: true,
          onClickFunction: function () {
            console.log('add node');
          },
          show: true
        }
      ],
      // css classes that menu items will have
      menuItemClasses: [
        // add class names to this list
      ],
      // css classes that context menu will have
      contextMenuClasses: [
        // add class names to this list
      ],
      container: this.cy.container().parentElement
    };
    this.cy.contextMenus(options);
  }

  editModeActivated(): void {
  }

  editModeDeactivated(): void {
  }

}
