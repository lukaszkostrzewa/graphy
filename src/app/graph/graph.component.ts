import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MdDialog, MdSnackBar} from '@angular/material';
import * as FileSaver from 'file-saver';
import * as jquery from 'jquery';
import {I18nPluralPipe} from '@angular/common';
import {Observable} from 'rxjs/Rx';
import {GraphService} from './graph.service';
import {AlgorithmService} from './algorithms/algorithm.service';
import {ImportGraphResult} from '../common/import-graph-result';
import {ParserService} from './parsers/parser.service';
import {ExportService} from './export/export.service';
import * as cytoscape from 'cytoscape/dist/cytoscape.js';
import * as undoRedo from 'cytoscape-undo-redo';
import * as clipboard from 'cytoscape-clipboard';
import {EditNodeDialogComponent} from '../edit-node-dialog/edit-node-dialog.component';
import {EditEdgeDialogComponent} from '../edit-edge-dialog/edit-edge-dialog.component';
import {MainToolbarComponent} from '../main-toolbar/main-toolbar.component';
import {ExportGraphOptions} from '../common/export-graph-options';
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
    I18nPluralPipe, AlgorithmService, ParserService, ExportService
  ]
})
export class GraphComponent implements OnInit, AfterViewInit {

  private static readonly ZOOM_IN_OUT_FACTOR = 1.25;
  private static readonly FIT_PADDING = 100;

  @ViewChild('graphContainer') container: ElementRef;
  @Output() empty = new EventEmitter<boolean>();
  @Input() mainToolbar?: MainToolbarComponent;

  private cy: Cy.Instance;
  private nodesCounter = 0;
  private edgesCounter = 0;
  undoRedo: any;

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
    undoRedo(cytoscape);
    clipboard(cytoscape, jquery);
    this.cy = this.graphService.initialize(this.container.nativeElement);
    this.undoRedo = this.cy.undoRedo({undoableDrag: false});
    this.cy.clipboard();
    this.undoRedo.action('add-edge', edges => this.cy.add(edges), edges => edges.remove());
    this.undoRedo.action('group-nodes',
      nodes => this.groupNodes(nodes),
      parent => this.ungroupNodes(parent));
    this.undoRedo.action('ungroup-nodes',
      parent => this.ungroupNodes(parent),
      nodes => this.groupNodes(nodes));
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

  exportGraph(options: ExportGraphOptions) {
    const blob = this.exportService.doExport(options.format.id);
    FileSaver.saveAs(blob, options.getFullName());
  }

  locate() {
    this.cy.fit(this.cy.nodes(), GraphComponent.FIT_PADDING);
  }

  setLayout(layoutName: string) {
    const layout: any = this.cy.layout({name: layoutName, padding: 100});
    if (layout) {
      layout.run();
    }
  }

  deleteSelectedElements() {
    const selectedEles = this.getSelectedElements();
    if (selectedEles.length) {
      const message = this.pluralPipe.transform(selectedEles.length, {
          '=1': 'One element has',
          'other': '# elements have'
        }) + ' been deleted.';
      this.undoRedo.do('remove', selectedEles);
      this.showMessageWithUndo(message);
    }
  }

  deleteElement(element) {
    const message = (element.isNode() ? 'Node' : 'Edge') + ' has been deleted.';
    this.undoRedo.do('remove', element);
    this.showMessageWithUndo(message);
  }

  addNodeAtPos(pos) {
    return this.undoRedo.do('add', {
      group: 'nodes',
      data: {
        id: this.getNextNodeId()
      },
      renderedPosition: pos
    });
  }

  openEditDialog(element) {
    const config = {data: {element}, width: '600px'};
    let dialog;
    if (element.isNode()) {
      dialog = this.dialog.open(EditNodeDialogComponent, config);
    } else {
      dialog = this.dialog.open(EditEdgeDialogComponent, config);
    }
    dialog.afterClosed().subscribe(
      result => result && this.snackBar.open('Element data updated.', null, {duration: 2000}));
  }

  private showMessageWithUndo(message: string) {
    this.snackBar.open(message, 'Undo', {duration: 2000}).onAction().subscribe(this.undo);
  }

  selectAll() {
    this.cy.elements().select();
  }

  moveGraph(options: Position) {
    this.cy.panBy(options);
  }

  groupSelectedNodes() {
    this.undoRedo.do('group-nodes', this.cy.$('node:selected'));
    this.deselect();
    this.showMessageWithUndo('Nodes has been grouped');
  }

  groupNodes(nodes) {
    const parent = this.createParentNode(nodes);
    nodes.move({parent: parent.id()});
    return parent;
  }

  ungroupSelectedNode() {
    this.undoRedo.do('ungroup-nodes', this.cy.$('node:selected:parent'));
    this.deselect();
    this.showMessageWithUndo('Node has been ungrouped');
  }

  ungroupNodes(parent) {
    const children = parent.children();
    children.move({parent: null});
    parent.remove();
    return children;
  }

  private createParentNode(nodes: Cy.CollectionElements) {
    return this.addNodeAtPos(this.getCenterPosition(nodes));
  }

  private getCenterPosition(nodes: CollectionElements): Cy.Position {
    const boundingBox = nodes.renderedBoundingbox({
      includeEdges: false
    });
    return {
      x: boundingBox.x1 + boundingBox.w / 2,
      y: boundingBox.y1 + boundingBox.h / 2
    }
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
    this.removeHighlight();
    this.algorithmService.get(algorithm).run().then(elements => {
      const cancel = this.snackBar.open('Algorithm started', 'Stop').onAction();
      Observable.from(elements).zip(Observable.timer(0, 500), x => x)
        .takeUntil(cancel)
        .subscribe({
          next: el => {
            el.addClass('highlighted');
          },
          complete: () =>
            this.snackBar.open('Algorithm finished', 'Clear').onAction()
              .subscribe(() => this.removeHighlight())
        });
    });
  }

  private removeHighlight() {
    return this.cy.$('.highlighted').removeClass('highlighted');
  }

  newGraph() {
    this.cy.elements().remove();
  }

  undo = () => {
    this.undoRedo.undo();
  };

  redo = () => {
    this.undoRedo.redo();
  };

  copy(elements?: CollectionElements) {
    this.cy.clipboard().copy(elements || this.cy.$(':selected'));
  }

  paste() {
    this.undoRedo.do('paste');
  }

  cut(elements?: CollectionElements) {
    elements = elements || this.cy.$(':selected');
    this.copy(elements);
    this.undoRedo.do('remove', elements);
  }

  directionalityChanged(directed) {
    this.graphService.setDirected(directed);
    this.cy.batch(() => {
      if (directed) {
        this.cy.edges().addClass('directed');
      } else {
        this.cy.edges().removeClass('directed');
      }
    });
  }

  isDirected(): boolean {
    return this.graphService.isDirected();
  }
}
