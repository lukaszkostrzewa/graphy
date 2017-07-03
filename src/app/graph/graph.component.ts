import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import cytoscape from "cytoscape/dist/cytoscape.js";

import {Parser} from "./parsers/parser";
import {GraphmlParser} from "./parsers/graphml-parser";
import {MdDialog, MdSnackBar} from "@angular/material";
import {PluginHandler} from "./plugin-handlers/plugin-handler";
import {EdgehandlesPluginHandler} from "./plugin-handlers/edgehandles-plugin-handler";
import {NodeAdditionPluginHandler} from "./plugin-handlers/node-addition-plugin-handler";
import {ShortcutsHandler} from "./shortcuts-handler";
import * as FileSaver from "file-saver";
import Position = Cy.Position;
import {ContextMenusPluginHandler} from "./plugin-handlers/context-menus-plugin-handler";
import {I18nPluralPipe} from "@angular/common";
import {EditElementDialogComponent} from "../edit-element-dialog/edit-element-dialog.component";
import ElementDefinition = Cy.ElementDefinition;
import {EdgeBendEditingPluginHandler} from "./plugin-handlers/edge-bend-editing-plugin-handler";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [I18nPluralPipe]
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer') container: ElementRef;

  private editMode: boolean;
  private cy: Cy.Instance;
  private parsers: Parser[] = [];
  private pluginHandlers: PluginHandler[] = [];
  private shortcutsHandler: ShortcutsHandler;
  private static readonly ZOOM_IN_OUT_FACTOR: number = 1.25;
  private static readonly FIT_PADDING: number = 100;
  private readonly readonlyNodeProperties = ['id', 'parent'];
  private readonly readonlyEdgeProperties = ['id', 'source', 'target'];
  private readonly commonNodeProperties = ['label'];
  private readonly commonEdgeProperties = ['label', 'weight'];

  setEditMode(value) {
    this.editMode = value;
    this.container.nativeElement.classList.toggle('edit-mode', value);

    if (value) {
      this.pluginHandlers.forEach(handler => handler.editModeActivated());
    } else {
      this.pluginHandlers.forEach(handler => handler.editModeDeactivated());
    }
  }

  constructor(private snackBar: MdSnackBar, private pluralPipe: I18nPluralPipe,
              private dialog: MdDialog) {
    this.shortcutsHandler = new ShortcutsHandler(this);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape(this.getConfig());

    this.parsers = [
      new GraphmlParser(this.cy)
    ];
    this.pluginHandlers = [
      new EdgehandlesPluginHandler(this),
      new NodeAdditionPluginHandler(this),
      new ContextMenusPluginHandler(this),
      new EdgeBendEditingPluginHandler(this)
    ];
  }

  getCy(): Cy.Instance {
    return this.cy;
  }

  private getConfig() {
    return {
      container: this.container.nativeElement,
      elements: [
        {data: {id: 'a', label: '1'}},
        {data: {id: 'b', label: '2'}},
        {data: {id: 'ab', source: 'a', target: 'b', label: 'test'}}
      ],
      layout: {
        name: 'grid'
      },
      style: [{
        "selector": "node, edge",
        "style": {
          "label": "data(label)",
        }
      }, {
        "selector": "edge",
        "style": {
          "text-margin-y": "-12px"
        }
      }],
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
    let selectedEles = this.cy.$(':selected');
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
    this.cy.add({
      group: "nodes",
      data: {
        id: '' + this.cy.nodes().length
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
}
