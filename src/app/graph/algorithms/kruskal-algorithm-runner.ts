import CollectionElements = Cy.CollectionElements;
import {AlgorithmRunner} from './algorithm-runner';
import {Injectable} from '@angular/core';

@Injectable()
export class KruskalAlgorithmRunner extends AlgorithmRunner {

  run(): Promise<CollectionElements> {
    const spanningTree = this.graphService.getCy().elements().kruskal(edge => edge.data('weight'));
    return Promise.resolve(spanningTree.filter('edge'));
  }

  name(): string {
    return 'kruskal';
  }
}
