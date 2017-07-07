import {Inject, Injectable} from "@angular/core";
import {AlgorithmRunner} from "./algorithm-runner";

@Injectable()
export class AlgorithmService {

  private algorithms: { [key: string]: AlgorithmRunner } = {};

  constructor(@Inject(AlgorithmRunner) algorithms: AlgorithmRunner[]) {
    algorithms.forEach(algorithm => this.algorithms[algorithm.name()] = algorithm);
  }

  get(algorithm: string): AlgorithmRunner {
    return this.algorithms[algorithm];
  }
}
