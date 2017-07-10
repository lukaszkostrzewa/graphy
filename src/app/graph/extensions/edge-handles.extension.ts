import cytoscape from "cytoscape/dist/cytoscape.js";
import edgehandles from "cytoscape-edgehandles";
import {AfterViewInit, Directive} from "@angular/core";
import {GraphService} from "../graph.service";
import {EditModeAwareExtension} from "./edit-mode-aware.extension";

@Directive({
  selector: 'app-graph',
  providers: [GraphService]
})
export class EdgeHandlesExtension extends EditModeAwareExtension implements AfterViewInit {

  ngAfterViewInit(): void {
    edgehandles(cytoscape);
    let defaults = {
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
