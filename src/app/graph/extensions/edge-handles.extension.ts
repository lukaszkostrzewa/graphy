import cytoscape from 'cytoscape/dist/cytoscape.js';
import edgehandles from 'cytoscape-edgehandles';
import {GraphComponent} from "../graph.component";
import {AfterViewInit, Directive, OnDestroy} from "@angular/core";
import {GraphService} from "../graph.service";
import {Subscription} from "rxjs/Subscription";

@Directive({
  selector: 'app-graph',
  providers: [GraphService]
})
export class EdgeHandlesExtension implements AfterViewInit, OnDestroy {

  private subscription: Subscription;

  constructor(private graphComponent: GraphComponent, private graphService: GraphService) {
    this.subscription = graphService.editObservable.subscribe({
      next: value => this.graphComponent.getCy().edgehandles(value ? 'enable' : 'disable')
    });
  }

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
      }
    };
    this.graphComponent.getCy().edgehandles(defaults);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
