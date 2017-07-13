import {MdSnackBar} from '@angular/material';
import {AlgorithmRunner} from './algorithm-runner';
import {Injectable} from '@angular/core';
import {GraphService} from '../graph.service';
import CollectionElements = Cy.CollectionElements;

@Injectable()
export class BfsAlgorithmRunner extends AlgorithmRunner {

  constructor(graphService: GraphService, private snackBar: MdSnackBar) {
    super(graphService);
  }

  run(): Promise<CollectionElements> {
    this.snackBar.open('Select starting node');
    const cy = this.graphService.getCy();
    return cy.promiseOn('tap', 'node')
      .then((event) => {
        this.snackBar.dismiss();
        const bfs = cy.elements().bfs({
          roots: event.target,
          directed: this.graphService.isDirected()
        });
        return Promise.resolve(bfs.path);
      });
  }

  name(): string {
    return 'bfs';
  }
}
