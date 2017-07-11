import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GraphComponent} from "../graph/graph.component";

@Component({
  selector: 'app-algorithms-menu',
  templateUrl: './algorithms-menu.component.html',
  styleUrls: ['./algorithms-menu.component.scss']
})
export class AlgorithmsMenuComponent implements OnInit {

  @ViewChild('algorithmsMenu') menu: any;
  @Input() graphComponent: GraphComponent;

  constructor() {
  }

  ngOnInit() {
  }

  runAlgorithm(algorithm: string) {
    this.graphComponent.runAlgorithm(algorithm);
  }
}
