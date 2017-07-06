import {GraphComponent} from "../graph.component";
import {Directive, OnDestroy} from "@angular/core";
import {GraphService} from "../graph.service";
import {Subscription} from "rxjs/Subscription";

@Directive({
  selector: 'app-graph',
  providers: [GraphService]
})
export class NodeAdditionExtension implements OnDestroy {

  private subscription: Subscription;
  private wasDeselected: boolean = false;

  constructor(private graphComponent: GraphComponent, private graphService: GraphService) {
    this.subscription = this.graphService.editObservable.subscribe({
      next: value => {
        if (value) {
          this.graphComponent.getCy().on('tapstart', this.deselectIfThereAreSelectedElements);
          this.graphComponent.getCy().on('click', this.addNodeOnClickIfNotDeselected);
        } else {
          this.graphComponent.getCy().off('tapstart', this.deselectIfThereAreSelectedElements);
          this.graphComponent.getCy().off('click', this.addNodeOnClickIfNotDeselected);
        }
      }
    })
  }

  private addNodeOnClickIfNotDeselected = (event) => {
    if (this.isClickOnViewport(event) && this.wasDeselected) {
      this.graphComponent.addNodeAtPos({
        x: event.originalEvent.offsetX,
        y: event.originalEvent.offsetY
      });
    }
  };

  private deselectIfThereAreSelectedElements = (event) => {
    this.wasDeselected = true;
    if (this.isClickOnViewport(event) && this.graphComponent.hasSelectedElements()) {
      this.wasDeselected = false;
      this.graphComponent.deselect();
      return true;
    }
  };

  private isClickOnViewport(event) {
    return event.target === this.graphComponent.getCy();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
