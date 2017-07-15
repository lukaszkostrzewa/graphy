import cytoscape from 'cytoscape/dist/cytoscape.js';
import edgehandles from 'cytoscape-edgehandles';
import {AfterViewInit, Directive} from '@angular/core';
import {EditModeAwareDirective} from './edit-mode-aware.directive';

@Directive({
  selector: '[appEdgeHandles]'
})
export class EdgeHandlesDirective extends EditModeAwareDirective implements AfterViewInit {

  ngAfterViewInit(): void {
    edgehandles(cytoscape);
    const defaults = {
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
      },
      complete: (sourceNode, targetNodes, addedEntities) => {
        addedEntities.remove();
        if (this.graphComponent.isDirected()) {
          addedEntities.addClass('directed');
        }
        this.graphComponent.undoRedo.do('add-edge', addedEntities);
      }
    };
    this.graphComponent.getCy().edgehandles(defaults);
  }

  editModeActivated() {
    this.graphComponent.getCy().edgehandles('enable');
  }

  editModeDeactivated() {
    this.graphComponent.getCy().edgehandles('disable');
  }
}
