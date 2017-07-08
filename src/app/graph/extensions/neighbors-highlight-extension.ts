import {AfterViewInit, Directive} from "@angular/core";
import {EditModeAwareExtension} from "./edit-mode-aware.extension";

@Directive({
  selector: 'app-graph'
})
export class NeighborsHighlightExtension extends EditModeAwareExtension implements AfterViewInit {

  ngAfterViewInit(): void {
    this.graphComponent.getCy().style().fromJson([{
      "selector": '.hover',
      "style": {
        'background-color': '#4580e5',
        'line-color': '#4580e5',
        'target-arrow-color': '#4580e5',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.2s'
      }
    }]);
    this.editModeDeactivated();
  }

  editModeDeactivated() {
    this.graphComponent.getCy().on('mouseover', 'node', this.onNodeMouseOver);
    this.graphComponent.getCy().on('mouseover', 'edge', this.onEdgeMouseOver);
    this.graphComponent.getCy().on('mouseout', 'node', this.onNodeMouseOut);
    this.graphComponent.getCy().on('mouseout', 'edge', this.onEdgeMouseOut);
  }

  editModeActivated() {
    this.graphComponent.getCy().elements().removeClass('hover');
    this.graphComponent.getCy().off('mouseover', 'node', this.onNodeMouseOver);
    this.graphComponent.getCy().off('mouseover', 'edge', this.onEdgeMouseOver);
    this.graphComponent.getCy().off('mouseout', 'node', this.onNodeMouseOut);
    this.graphComponent.getCy().off('mouseout', 'edge', this.onEdgeMouseOut);
  }

  onNodeMouseOver = event => {
    if (!event.target.isParent()) {
      this.addHoverClass(event, event.target.outgoers());
    }
  };

  onNodeMouseOut = event => {
    if (!event.target.isParent()) {
      this.removeHoverClass(event, event.target.outgoers());
    }
  };

  onEdgeMouseOver = event => {
    this.addHoverClass(event, event.target.connectedNodes());
  };

  onEdgeMouseOut = event => {
    this.removeHoverClass(event, event.target.connectedNodes());
  };

  private addHoverClass(event, neighbors) {
    neighbors.union(event.target).addClass('hover');
  }

  private removeHoverClass(event, neighbors) {
    neighbors.union(event.target).removeClass('hover');
  }
}
