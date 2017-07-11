import {GraphComponent} from "../graph.component";
import {Directive, OnDestroy} from "@angular/core";
import {GraphService} from "../graph.service";
import {Subscription} from "rxjs/Subscription";

@Directive({
  selector: 'app-graph',
  providers: [GraphService]
})
export class EditModeAwareExtension implements OnDestroy {

  private subscription: Subscription;

  constructor(protected graphComponent: GraphComponent, private graphService: GraphService) {
    this.subscription = this.graphService.editObservable.subscribe({
      next: value => value ? this.editModeActivated() : this.editModeDeactivated()
    });
  }

  protected editModeActivated() {
  }

  protected editModeDeactivated() {
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
