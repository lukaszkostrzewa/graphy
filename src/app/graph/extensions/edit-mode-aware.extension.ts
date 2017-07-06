import {GraphComponent} from "../graph.component";
import {Directive, OnDestroy} from "@angular/core";
import {GraphService} from "../graph.service";
import {Subscription} from "rxjs/Subscription";

@Directive({
  selector: 'app-graph',
  providers: [GraphService]
})
export abstract class EditModeAwareExtension implements OnDestroy {

  private subscription: Subscription;

  constructor(protected graphComponent: GraphComponent, private graphService: GraphService) {
    this.subscription = this.graphService.editObservable.subscribe({
      next: value => value ? this.editModeActivated() : this.editModeDeactivated()
    })
  }

  abstract editModeActivated();

  abstract editModeDeactivated();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
