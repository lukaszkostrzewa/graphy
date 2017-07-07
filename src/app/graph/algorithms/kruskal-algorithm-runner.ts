import CollectionElements = Cy.CollectionElements;
import {AlgorithmRunner} from "./algorithm-runner";
import {Injectable} from "@angular/core";
import {GraphService} from "../graph.service";

@Injectable()
export class KruskalAlgorithmRunner implements AlgorithmRunner {

  constructor(private graphService: GraphService) {
  }

  run(): Promise<CollectionElements> {
    let spanningTree = this.graphService.getCy().elements().kruskal(edge => edge.data('weight'));
    return Promise.resolve(spanningTree.filter('edge'));
  }
}
