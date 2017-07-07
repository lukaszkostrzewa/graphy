import CollectionElements = Cy.CollectionElements;
import {AlgorithmRunner} from "./algorithm-runner";
import {Injectable} from "@angular/core";
import {GraphService} from "../graph.service";

@Injectable()
export class KargerSteinAlgorithmRunner implements AlgorithmRunner {

  constructor(private graphService: GraphService) {
  }

  run(): Promise<CollectionElements> {
    let minCut = this.graphService.getCy().elements().kargerStein();
    return Promise.resolve(minCut.cut);
  }
}
