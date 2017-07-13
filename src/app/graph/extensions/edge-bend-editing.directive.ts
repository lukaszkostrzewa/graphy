import {GraphComponent} from '../graph.component';
import * as jquery from 'jquery';
import cytoscape from 'cytoscape/dist/cytoscape.js';
import edgeBendEditing from 'cytoscape-edge-bend-editing';
import {AfterViewInit, Directive} from '@angular/core';

@Directive({
  selector: '[appEdgeBendEditing]'
})
export class EdgeBendEditingDirective implements AfterViewInit {

  constructor(private graphComponent: GraphComponent) {
  }

  ngAfterViewInit(): void {
    edgeBendEditing(cytoscape, jquery);
    this.graphComponent.getCy().edgeBendEditing({
      addBendMenuItemTitle: 'Add Bend Point',
      removeBendMenuItemTitle: 'Remove Bend Point'
    });
  }
}
