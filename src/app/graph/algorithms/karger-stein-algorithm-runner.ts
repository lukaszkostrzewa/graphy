import CollectionElements = Cy.CollectionElements;
import {AlgorithmRunner} from "./algorithm-runner";
import {Injectable} from "@angular/core";

@Injectable()
export class KargerSteinAlgorithmRunner extends AlgorithmRunner {

  run(): Promise<CollectionElements> {
    let minCut = this.graphService.getCy().elements().kargerStein();
    return Promise.resolve(minCut.cut);
  }

  name(): string {
    return 'karger-stein';
  }
}
