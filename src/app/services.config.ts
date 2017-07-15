import {GraphmlParser} from './graph/parsers/graphml-parser';
import {JsonCytoscapeParser} from './graph/parsers/json-cytoscape-parser';
import {JsonGraphParser} from './graph/parsers/json-graph-parser';
import {GraphmlExporter} from './graph/export/graphml-exporter';
import {JsonCytoscapeExporter} from './graph/export/json-cytoscape-exporter';
import {JpgExporter} from './graph/export/jpg-exporter';
import {PngExporter} from './graph/export/png-exporter';
import {BfsAlgorithmRunner} from './graph/algorithms/bfs-algorithm-runner';
import {DfsAlgorithmRunner} from './graph/algorithms/dfs-algorithm-runner';
import {DijkstraAlgorithmRunner} from './graph/algorithms/dijkstra-algorithm-runner';
import {KruskalAlgorithmRunner} from './graph/algorithms/kruskal-algorithm-runner';
import {KargerSteinAlgorithmRunner} from './graph/algorithms/karger-stein-algorithm-runner';
import {Parser} from 'app/graph/parsers/parser';
import {AlgorithmRunner} from './graph/algorithms/algorithm-runner';
import {Exporter} from './graph/export/exporter';

export const parsers = [
  {provide: Parser, useClass: GraphmlParser, multi: true},
  {provide: Parser, useClass: JsonGraphParser, multi: true},
  {provide: Parser, useClass: JsonCytoscapeParser, multi: true},
];

export const exporters = [
  {provide: Exporter, useClass: JsonCytoscapeExporter, multi: true},
  {provide: Exporter, useClass: GraphmlExporter, multi: true},
  {provide: Exporter, useClass: JpgExporter, multi: true},
  {provide: Exporter, useClass: PngExporter, multi: true},
];

export const algorithms = [
  {provide: AlgorithmRunner, useClass: BfsAlgorithmRunner, multi: true},
  {provide: AlgorithmRunner, useClass: DfsAlgorithmRunner, multi: true},
  {provide: AlgorithmRunner, useClass: DijkstraAlgorithmRunner, multi: true},
  {provide: AlgorithmRunner, useClass: KruskalAlgorithmRunner, multi: true},
  {provide: AlgorithmRunner, useClass: KargerSteinAlgorithmRunner, multi: true},
];
