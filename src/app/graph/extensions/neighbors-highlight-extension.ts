import {AfterViewInit, Directive} from "@angular/core";
import {EditModeAwareExtension} from "./edit-mode-aware.extension";

@Directive({
  selector: 'app-graph'
})
export class NeighborsHighlightExtension extends EditModeAwareExtension implements AfterViewInit {

  ngAfterViewInit(): void {
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
      this.addHoverClass(event, this.getOutgoingEdges(event));
    }
  };

  onNodeMouseOut = event => {
    if (!event.target.isParent()) {
      this.removeHoverClass(event, this.getOutgoingEdges(event));
    }
  };

  private getOutgoingEdges(event) {
    return this.graphComponent.isDirected()
      ? event.target.outgoers()
      : event.target.connectedEdges();
  }

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
