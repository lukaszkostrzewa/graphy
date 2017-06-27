import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import cytoscape from 'cytoscape/dist/cytoscape.js';
import edgehandles from 'cytoscape-edgehandles';
import contextMenus from 'cytoscape-context-menus';
import * as jquery from "jquery";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer') container: ElementRef;

  private editMode: boolean;
  private cy: Cy.Instance;

  setEditMode(value) {
    this.editMode = value;
    this.container.nativeElement.classList.toggle('edit-mode', value);
    if (value) {
      this.cy.on('click', this.addNodeOnClickEvent);
      this.cy.edgehandles('enable');
    } else {
      this.cy.off('click', this.addNodeOnClickEvent);
      this.cy.edgehandles('disable');
    }
  }

  constructor() {
  }

  ngOnInit() {
    edgehandles(cytoscape);
    contextMenus(cytoscape, jquery);
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape({
      container: this.container.nativeElement,
      elements: [
        {data: {id: 'a'}},
        {data: {id: 'b'}},
        {data: {id: 'ab', source: 'a', target: 'b'}}
      ],
      layout: {
        name: 'grid'
      }
    });

    let defaults = {
      handleHitThreshold: 12,
      handleColor: '#3f51b5',
      hoverDelay: 0,
      enabled: false,
      loopAllowed: () => true
    };
    this.cy.edgehandles(defaults);


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
      container: this.container.nativeElement
    };
    this.cy.contextMenus(options);
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
  }

}
