import {AlgorithmRunner} from "./algorithm-runner";
import {MdSnackBar} from "@angular/material";
import {Injectable} from "@angular/core";
import {GraphService} from "../graph.service";
import CollectionElements = Cy.CollectionElements;

@Injectable()
export class DijkstraAlgorithmRunner extends AlgorithmRunner {

  constructor(graphService: GraphService, private snackBar: MdSnackBar) {
    super(graphService);
  }

  run(): Promise<CollectionElements> {
    this.snackBar.open('Select starting node');
    let cy = this.graphService.getCy();
    return cy.promiseOn('tap', 'node').then((event) => {
      this.snackBar.dismiss();
      this.snackBar.open('Select destination node');
      return Promise.all([Promise.resolve(event), cy.promiseOn('tap', 'node')]);
    }).then((events) => {
      this.snackBar.dismiss();
      let dijkstra = cy.elements().dijkstra({
        root: events[0].target,
        weight: edge => +edge.data('weight'),
        directed: this.graphService.isDirected()
      });
      return Promise.resolve(dijkstra.pathTo(events[1].target));
    });
  }

  name(): string {
    return 'dijkstra';
  }
}
