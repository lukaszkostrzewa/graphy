import CollectionElements = Cy.CollectionElements;
import {Injectable} from "@angular/core";
import {GraphService} from "app/graph/graph.service";

@Injectable()
export class AlgorithmRunner {

  constructor(protected graphService: GraphService) {
  }

  public run(): Promise<CollectionElements> {
    throw new Error("Method run not implemented");
  }

  public name(): string {
    throw new Error("Method name not implemented");
  }
}
