import {Injectable} from "@angular/core";
import {AlgorithmRunner} from "./algorithm-runner";
import {BfsAlgorithmRunner} from "./bfs-algorithm-runner";
import {DfsAlgorithmRunner} from "./dfs-algorithm-runner";
import {KruskalAlgorithmRunner} from "./kruskal-algorithm-runner";
import {KargerSteinAlgorithmRunner} from "./karger-stein-algorithm-runner";
import {DijkstraAlgorithmRunner} from "./dijkstra-algorithm-runner";

@Injectable()
export class AlgorithmService {

  private algorithms: { [key: string]: AlgorithmRunner };

  constructor(private bfsAlgorithmRunner: BfsAlgorithmRunner,
              private dfsAlgorithmRunner: DfsAlgorithmRunner,
              private kruskalAlgorithmRunner: KruskalAlgorithmRunner,
              private kargerSteinAlgorithmRunner: KargerSteinAlgorithmRunner,
              private dijkstraAlgorithmRunner: DijkstraAlgorithmRunner) {
    this.algorithms = {
      'bfs': bfsAlgorithmRunner,
      'dfs': dfsAlgorithmRunner,
      'kruskal': kruskalAlgorithmRunner,
      'karger-stein': kargerSteinAlgorithmRunner,
      'dijkstra': dijkstraAlgorithmRunner
    };
  }

  get(algorithm: string): AlgorithmRunner {
    return this.algorithms[algorithm];
  }
}
