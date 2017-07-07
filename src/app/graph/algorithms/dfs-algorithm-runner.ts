import {MdSnackBar} from "@angular/material";
import {AlgorithmRunner} from "./algorithm-runner";
import {Injectable} from "@angular/core";
import CollectionElements = Cy.CollectionElements;
import {GraphService} from "../graph.service";

@Injectable()
export class DfsAlgorithmRunner implements AlgorithmRunner {

  constructor(private graphService: GraphService, private snackBar: MdSnackBar) {
  }

  run(): Promise<CollectionElements> {
    this.snackBar.open('Select starting node');
    let cy = this.graphService.getCy();
    return cy.promiseOn('tap', 'node')
      .then((event) => {
        this.snackBar.dismiss();
        let dfs = cy.elements().dfs({roots: event.target, directed: false});
        return Promise.resolve(dfs.path);
      });
  }
}
