import {MdSnackBar} from '@angular/material';
import {AlgorithmRunner} from './algorithm-runner';
import {Injectable} from '@angular/core';
import CollectionElements = Cy.CollectionElements;
import {GraphService} from '../graph.service';

@Injectable()
export class DfsAlgorithmRunner extends AlgorithmRunner {

  constructor(graphService: GraphService, private snackBar: MdSnackBar) {
    super(graphService);
  }

  run(): Promise<CollectionElements> {
    this.snackBar.open('Select starting node');
    const cy = this.graphService.getCy();
    return cy.promiseOn('tap', 'node')
      .then((event) => {
        this.snackBar.dismiss();
        const dfs = cy.elements().dfs({
          roots: event.target,
          directed: this.graphService.isDirected()
        });
        return Promise.resolve(dfs.path);
      });
  }

  name(): string {
    return 'dfs';
  }
}
