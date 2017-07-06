import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import cytoscape from "cytoscape/dist/cytoscape.js";

import {Parser} from "./parsers/parser";
import {GraphmlParser} from "./parsers/graphml-parser";
import {MdDialog, MdSnackBar} from "@angular/material";
import {ShortcutsHandler} from "./shortcuts-handler";
import * as FileSaver from "file-saver";
import {I18nPluralPipe} from "@angular/common";
import {EditElementDialogComponent} from "../edit-element-dialog/edit-element-dialog.component";
import {Observable} from "rxjs/Rx";
import {GraphService} from "./graph.service";
import Position = Cy.Position;
import ElementDefinition = Cy.ElementDefinition;
import CollectionElements = Cy.CollectionElements;
import CollectionFirstNode = Cy.CollectionFirstNode;
import CollectionNodes = Cy.CollectionNodes;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [I18nPluralPipe, GraphService]
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer') container: ElementRef;

  private cy: Cy.Instance;
  private parsers: Parser[] = [];
  private algorithmRunners: { [key: string]: AlgorithmRunner; } = {};
  private shortcutsHandler: ShortcutsHandler;
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
              private dialog: MdDialog, private graphService: GraphService) {
    this.shortcutsHandler = new ShortcutsHandler(this);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape(this.getConfig());

    this.parsers = [
      new GraphmlParser(this.cy)
    ];
    this.algorithmRunners['bfs'] = new BfsAlgorithmRunner(this.cy, this.snackBar);
    this.algorithmRunners['dfs'] = new DfsAlgorithmRunner(this.cy, this.snackBar);
    this.algorithmRunners['kruskal'] = new KruskalAlgorithmRunner(this.cy);
    this.algorithmRunners['karger-stein'] = new KargerSteinAlgorithmRunner(this.cy);
    this.algorithmRunners['dijkstra'] = new DijkstraAlgorithmRunner(this.cy, this.snackBar);
  }

  getCy(): Cy.Instance {
    return this.cy;
  }

  private getConfig() {
    return {
      container: this.container.nativeElement,
      elements: [
        {data: {id: 'a', label: 'A'}},
        {data: {id: 'b', label: 'B'}},
        {data: {id: 'c', label: 'C'}},
        {data: {id: 'ab', source: 'a', target: 'b', weight: '1'}},
        {data: {id: 'bc', source: 'b', target: 'c', weight: '1'}},
        {data: {id: 'ac', source: 'a', target: 'c', weight: '100'}}
      ],
      layout: {
        name: 'grid'
      },
      style: [{
        "selector": "node",
        "style": {
          "content": "data(label)",
        }
      }, {
        "selector": "edge",
        "style": {
          "text-margin-y": "-12px",
          "content": "data(weight)",
        }
      }, {
        "selector": '.highlighted',
        "style": {
          'background-color': '#61bffc',
          'line-color': '#61bffc',
          'target-arrow-color': '#61bffc',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        }
      }
      ],
      wheelSensitivity: 0.2,
      boxSelectionEnabled: true
    };
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

  parseAndInit(content: string) {
    let parser = this.parsers.find(parser => parser.canParse(content));
    if (parser) {
      parser.parse(content);
    } else {
      console.error('Unable to find supporting parser', content);
      this.snackBar.open('Unable to import selected graph - unsupported format.');
    }
  }

  exportGraph(type: string) {
    if (type === 'graphml') {
      let blob = new Blob([this.cy.graphml()], {
        type: "application/xml"
      });
      FileSaver.saveAs(blob, "graph.xml");
    }
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

  keydown(event: KeyboardEvent) {
    this.shortcutsHandler.keydown(event);
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
    this.algorithmRunners[algorithm].run()
      .subscribe({
        next: (elements) => {
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
        }
      });
  }
}

interface AlgorithmRunner {
  run(): Observable<CollectionElements>;
}

class BfsAlgorithmRunner implements AlgorithmRunner {

  constructor(private cy: Cy.Instance, private snackBar: MdSnackBar) {
  }

  run(): Observable<CollectionElements> {
    return Observable.create((observer) => {
      let message = this.snackBar.open('Select starting node');
      this.cy.one('tap', 'node', (event) => {
        message.dismiss();
        observer.next((<any>event).target);
        observer.complete();
      });
    }).map((result) => {
      let bfs = this.cy.elements().bfs({roots: result, directed: true});
      return bfs.path;
    });
  }
}

class DfsAlgorithmRunner implements AlgorithmRunner {

  constructor(private cy: Cy.Instance, private snackBar: MdSnackBar) {
  }

  run(): Observable<CollectionElements> {
    return Observable.create((observer) => {
      let message = this.snackBar.open('Select starting node');
      this.cy.one('tap', 'node', (event) => {
        message.dismiss();
        observer.next((<any>event).target);
        observer.complete();
      });
    }).map((result) => {
      let dfs = this.cy.elements().dfs({roots: result, directed: true});
      return dfs.path;
    });
  }
}

class KruskalAlgorithmRunner implements AlgorithmRunner {

  constructor(private cy: Cy.Instance) {
  }

  run(): Observable<CollectionElements> {
    let spanningTree = this.cy.elements().kruskal(edge => edge.data('weight'));
    return Observable.of(spanningTree.filter('edge'));
  }
}

class KargerSteinAlgorithmRunner implements AlgorithmRunner {

  constructor(private cy: Cy.Instance) {
  }

  run(): Observable<CollectionElements> {
    let minCut = this.cy.elements().kargerStein();
    return Observable.of(minCut.cut);
  }
}

class DijkstraAlgorithmRunner implements AlgorithmRunner {

  constructor(private cy: Cy.Instance, private snackBar: MdSnackBar) {
  }

  run(): Observable<CollectionElements> {
    return Observable.create(observer => {
      let message = this.snackBar.open('Select starting node');
      setTimeout(() => this.cy.one('tap', 'node', (event) => {
        message.dismiss();
        observer.next((<any>event).target);
        observer.complete();
      }), 0);
    }).flatMap(result => {
      return Observable.create((observer) => {
        let message = this.snackBar.open('Select destination node');
        setTimeout(() => this.cy.one('tap', 'node', (event) => {
          message.dismiss();
          observer.next({end: (<any>event).target, start: result});
          observer.complete();
        }), 0);
      }).map((result) => {
        let dijkstra = this.cy.elements().dijkstra({
          root: result.start,
          weight: edge => +edge.data('weight'),
          directed: true
        });
        return dijkstra.pathTo(result.end);
      });
    });
  }
}
