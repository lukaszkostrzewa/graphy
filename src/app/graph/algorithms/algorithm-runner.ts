import CollectionElements = Cy.CollectionElements;

export interface AlgorithmRunner {
  run(): Promise<CollectionElements>;
}
