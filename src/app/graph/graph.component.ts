import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";

import {Parser} from "./parsers/parser";
import {GraphmlParser} from "./parsers/graphml-parser";
import {MdDialog, MdSnackBar} from "@angular/material";
import * as FileSaver from "file-saver";
import {I18nPluralPipe} from "@angular/common";
import {EditElementDialogComponent} from "../edit-element-dialog/edit-element-dialog.component";
import {Observable} from "rxjs/Rx";
import {GraphService} from "./graph.service";
import {AlgorithmService} from "./algorithms/algorithm.service";
import {BfsAlgorithmRunner} from "./algorithms/bfs-algorithm-runner";
import {DfsAlgorithmRunner} from "./algorithms/dfs-algorithm-runner";
import {KruskalAlgorithmRunner} from "./algorithms/kruskal-algorithm-runner";
import {DijkstraAlgorithmRunner} from "./algorithms/dijkstra-algorithm-runner";
import {KargerSteinAlgorithmRunner} from "./algorithms/karger-stein-algorithm-runner";
import {ImportGraphResult} from "../common/ImportGraphResult";
import {ParserService} from "./parsers/parser.service";
import {JsonParser} from "./parsers/json-parser";
import {AlgorithmRunner} from "./algorithms/algorithm-runner";
import {ExportService} from "./export/export.service";
import {Exporter} from "./export/exporter";
import {JsonExporter} from "./export/json-exporter";
import {GraphmlExporter} from "./export/graphml-exporter";
import {JpgExporter} from "app/graph/export/jpg-exporter";
import {PngExporter} from "./export/png-exporter";
import * as moment from "moment";
import Position = Cy.Position;
import ElementDefinition = Cy.ElementDefinition;
import CollectionElements = Cy.CollectionElements;
import CollectionFirstNode = Cy.CollectionFirstNode;
import CollectionNodes = Cy.CollectionNodes;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [
    I18nPluralPipe, GraphService, AlgorithmService, ParserService, ExportService,
    {provide: AlgorithmRunner, useClass: BfsAlgorithmRunner, multi: true},
    {provide: AlgorithmRunner, useClass: DfsAlgorithmRunner, multi: true},
    {provide: AlgorithmRunner, useClass: DijkstraAlgorithmRunner, multi: true},
    {provide: AlgorithmRunner, useClass: KruskalAlgorithmRunner, multi: true},
    {provide: AlgorithmRunner, useClass: KargerSteinAlgorithmRunner, multi: true},
    {provide: Parser, useClass: JsonParser, multi: true},
    {provide: Parser, useClass: GraphmlParser, multi: true},
    {provide: Exporter, useClass: JsonExporter, multi: true},
    {provide: Exporter, useClass: GraphmlExporter, multi: true},
    {provide: Exporter, useClass: PngExporter, multi: true},
    {provide: Exporter, useClass: JpgExporter, multi: true}
  ]
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer') container: ElementRef;
  @Output() empty = new EventEmitter<boolean>();

  private cy: Cy.Instance;
  private static readonly ZOOM_IN_OUT_FACTOR: number = 1.25;
  private static readonly FIT_PADDING: number = 100;
  private readonly readonlyNodeProperties = ['id', 'parent'];
  private readonly readonlyEdgeProperties = ['id', 'source', 'target'];
  private readonly commonNodeProperties = ['label'];
  private readonly commonEdgeProperties = ['label', 'weight'];
  private nodesCounter: number = 0;
  private edgesCounter: number = 0;

  getNextEdgeId(): string {
    return 'edge_' + this.edgesCounter++;
  }

  getNextNodeId(): string {
    return 'node_' + this.nodesCounter++;
  }

  setEditMode(value) {
    this.container.nativeElement.classList.toggle('edit-mode', value);
    if (value) {
      this.graphService.editModeOn();
    } else {
      this.graphService.editModeOff();
    }
  }

  constructor(private snackBar: MdSnackBar, private pluralPipe: I18nPluralPipe,
              private dialog: MdDialog, private graphService: GraphService,
              private algorithmService: AlgorithmService, private parserService: ParserService,
              private exportService: ExportService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cy = this.graphService.initialize(this.container.nativeElement);
    this.empty.emit(false);
    this.cy.on('add', (evt) => {
      if (evt.cy.elements().length === 1) {
        this.empty.emit(false);
      }
    });
    this.cy.on('remove', (evt) => {
      if (evt.cy.elements().empty()) {
        this.empty.emit(true);
      }
    });
  }

  getCy(): Cy.Instance {
    return this.cy;
  }

  zoomIn() {
    this.zoom(GraphComponent.ZOOM_IN_OUT_FACTOR);
  }

  zoomOut() {
    this.zoom(1 / GraphComponent.ZOOM_IN_OUT_FACTOR)
  }

  private zoom(factor: number) {
    this.cy.zoom(this.cy.zoom() * factor);
    this.cy.center();
  }

  parseAndInit(result: ImportGraphResult) {
    this.newGraph();
    this.parserService.get(result.type).parse(result.content);
  }

  exportGraph(type: string) {
    let {blob, extension} = this.exportService.doExport(type);
    let date = moment().format('DD-MM-YYYY-HH-mm-ss');
    let fileName = `graph-${date}.${extension}`;
    FileSaver.saveAs(blob, fileName);
  }

  locate() {
    this.cy.fit(this.cy.nodes(), GraphComponent.FIT_PADDING);
  }

  setLayout(layoutName: string) {
    let layout: any = this.cy.layout({name: layoutName, padding: 100});
    if (layout) {
      layout.run();
    }
  }

  deleteSelectedElements() {
    let selectedEles = this.getSelectedElements();
    let message = this.pluralPipe.transform(selectedEles.length, {
        '=0': 'No element has',
        '=1': 'One element has',
        'other': '# elements have'
      }) + ' been deleted.';
    selectedEles.remove();
    this.showMessage(message);
  }

  deleteElement(element) {
    let message = (element.isNode() ? 'Node' : 'Edge') + ' has been deleted.';
    element.remove();
    this.showMessage(message);
  }

  addNodeAtPos(pos) {
    return this.cy.add({
      group: "nodes",
      data: {
        id: this.getNextNodeId()
      },
      renderedPosition: pos
    });
  }

  openEditDialog(element) {
    let readonlyProperties = element.isNode()
      ? this.readonlyNodeProperties
      : this.readonlyEdgeProperties;
    let commonProperties = element.isNode()
      ? this.commonNodeProperties
      : this.commonEdgeProperties;
    this.dialog.open(EditElementDialogComponent, {
      data: {
        element,
        readonlyProperties,
        commonProperties
      },
      width: '600px'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open((result.isNode() ? 'Node' : 'Edge') + ' data updated.', 'Undo', {
          duration: 2000
        });
      }
    });
  }

  private showMessage(message: string) {
    this.snackBar
      .open(message, 'Undo', {
        duration: 2000,
      })
      .onAction()
      .subscribe(() => {
        console.log('Undo node deletion');
      });
  }

  selectAll() {
    this.cy.elements().select();
  }

  moveGraph(options: Position) {
    this.cy.panBy(options);
  }

  groupSelectedNodes() {
    let nodes = this.cy.$('node:selected');
    let parent = this.createParentNode(nodes);
    let newNodes = this.createNodesCopies(nodes);
    this.addParentToNodes(newNodes, parent);
    let edges = this.getConnectedEdges(nodes);
    this.replaceWithNodesCopies(newNodes, nodes, edges);
    this.snackBar.open('Nodes has been grouped', 'Undo');
  }

  ungroupSelectedNode() {
    let selectedNode = this.cy.$('node:selected');
    let newNodes = this.createNodesCopies(selectedNode.children());
    let edges = this.getConnectedEdges(selectedNode.children());
    this.replaceWithNodesCopies(newNodes, selectedNode, edges);
    this.snackBar.open('Node has been ungrouped', 'Undo');
  }

  private createParentNode(nodes: Cy.CollectionElements) {
    return this.addNodeAtPos(this.getCenterPosition(nodes));
  }

  private getCenterPosition(nodes: CollectionElements): Cy.Position {
    let boundingBox = nodes.renderedBoundingbox({
      includeEdges: false
    });
    return {
      x: boundingBox.x1 + boundingBox.w / 2,
      y: boundingBox.y1 + boundingBox.h / 2
    }
  }

  private createNodesCopies(nodes: Cy.CollectionNodes) {
    return nodes.map(node => {
      return {
        group: "nodes",
        data: node.data(),
        renderedPosition: node.renderedPosition()
      }
    });
  }

  private addParentToNodes(newNodes: any[], parent: Cy.CollectionElements) {
    let parentId = parent.data('id');
    newNodes.forEach(node => {
      node.data = $.extend(node.data, {parent: parentId});
    });
  }

  private getConnectedEdges(nodes: Cy.CollectionNodes): Cy.CollectionEdges[] {
    return nodes.map(node => node.connectedEdges());
  }

  private replaceWithNodesCopies(newNodes, oldNodes, edges) {
    oldNodes.remove();
    this.cy.add(newNodes);
    edges.forEach((nodeEdges) => this.cy.add(nodeEdges));
    this.deselect();
  }

  hasSelectedElements(): boolean {
    return this.getSelectedElements().length > 0;
  }

  getSelectedElements(): CollectionElements {
    return this.cy.$(':selected');
  }

  deselect(): void {
    this.getSelectedElements().unselect();
  }

  runAlgorithm(algorithm: string): void {
    this.algorithmService.get(algorithm).run().then(elements => {
      let cancel = this.snackBar.open('Algorithm started', 'Stop').onAction();
      Observable.from(elements).zip(Observable.timer(0, 500), x => x)
        .takeUntil(cancel)
        .subscribe({
          next: el => {
            el.addClass('highlighted');
          },
          complete: () =>
            this.snackBar.open('Algorithm finished', 'Clear').onAction()
              .subscribe(() => this.cy.$('.highlighted').removeClass('highlighted'))
        });
    });
  }

  newGraph() {
    this.cy.elements().remove();
  }
}
