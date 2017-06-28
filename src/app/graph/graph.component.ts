import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import cytoscape from 'cytoscape/dist/cytoscape.js';

import {Parser} from "./parsers/parser";
import {GraphmlParser} from "./parsers/graphml-parser";
import {MdSnackBar} from "@angular/material";
import {PluginHandler} from "./plugin-handlers/plugin-handler";
import {EdgehandlesPluginHandler} from "./plugin-handlers/edgehandles-plugin-handler";
import {NodeAdditionPluginHandler} from "./plugin-handlers/node-addition-plugin-handler";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer') container: ElementRef;

  private editMode: boolean;
  private cy: Cy.Instance;
  private parsers: Parser[] = [];
  private pluginHandlers: PluginHandler[] = [];
  private static readonly ZOOM_IN_OUT_FACTOR: number = 1.25;
  private static readonly FIT_PADDING: number = 100;

  setEditMode(value) {
    this.editMode = value;
    this.container.nativeElement.classList.toggle('edit-mode', value);

    if (value) {
      this.pluginHandlers.forEach(handler => handler.editModeActivated());
    } else {
      this.pluginHandlers.forEach(handler => handler.editModeDeactivated());
    }
  }

  constructor(private snackBar: MdSnackBar) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape(this.getConfig());

    this.parsers = [
      new GraphmlParser(this.cy)
    ];
    this.pluginHandlers = [
      new EdgehandlesPluginHandler(this.cy),
      new NodeAdditionPluginHandler(this.cy)
    ];
  }

  private getConfig() {
    return {
      container: this.container.nativeElement,
      elements: [
        {data: {id: 'a'}},
        {data: {id: 'b'}},
        {data: {id: 'ab', source: 'a', target: 'b'}}
      ],
      layout: {
        name: 'grid'
      },
      wheelSensitivity: 0.2
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

  parseAndInit(content) {
    let parser = this.parsers.find(parser => parser.canParse(content));
    if (parser) {
      parser.parse(content);
    } else {
      console.error('Unable to find supporting parser', content);
      this.snackBar.open('Unable to import selected graph - unsupported format.');
    }
  }

  locate() {
    this.cy.fit(this.cy.nodes(), GraphComponent.FIT_PADDING);
  }

  setLayout(layoutName: string) {
    let layout: any = this.cy.layout({name: layoutName});
    if (layout) {
      layout.run();
    }
  }
}
